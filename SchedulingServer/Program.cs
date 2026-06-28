using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using SchedulingServer.Data;
using SchedulingServer.Endpoints;
using SchedulingServer.Models.User;
using SchedulingServer.Services;

var builder = WebApplication.CreateBuilder(args);

string? dbConnection = builder.Configuration["POSTGRESQLCONNSTR_DatabaseConnectionString"];
if (string.IsNullOrEmpty(dbConnection))
{
    builder.Services.AddDbContext<ScheduleContext>(options =>
        options.UseSqlite("Data Source=employees.db"), ServiceLifetime.Scoped);
}
else
{
    builder.Services.AddDbContext<ScheduleContext>(options =>
        options.UseNpgsql(dbConnection));
}

builder.Services.AddAuthentication(options => 
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options => 
{
    options.TokenValidationParameters = new TokenValidationParameters 
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)
        )
    };
});
builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowSpecificOrigins",
        builder =>
        {
            builder.WithOrigins("https://web.ereck.net", "https://server.ereck.net");
            builder.AllowAnyHeader()
                    .AllowAnyMethod();
        });
});

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    //https://learn.microsoft.com/en-us/azure/container-apps/dotnet-overview#define-x-forwarded-headers
    options.ForwardedHeaders =
        ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.KnownIPNetworks.Clear();
    options.KnownProxies.Clear();
});

builder.Services.AddScoped<IRefreshTokenService, RefreshTokenService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPunchService, PunchServices>();
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<ScheduleContext>();

builder.Services.AddOpenApi();

var app = builder.Build();

app.UseCors("AllowSpecificOrigins");

app.MapGet("/", () => "Hello World!");

app.RegisterUserEndpoints();
app.RegisterAuthEndpoints();
app.RegisterPunchEndpoints();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseForwardedHeaders();
    app.MapScalarApiReference();
    
    using var scope = app.Services.CreateScope();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
    Console.WriteLine("Seeding...");
    await Seeder.SeedUser(userManager, builder.Configuration["Seed:UserName"] ?? "Placeholder", builder.Configuration["Seed:Email"] ?? "admin@admin.com", builder.Configuration["Seed:Password"] ?? "Password0!");
}

app.Run();
