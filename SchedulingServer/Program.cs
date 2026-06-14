using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using SchedulingServer.Data;
using SchedulingServer.Endpoints;
using SchedulingServer.Helpers;
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


builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddOpenApi();

var app = builder.Build();

app.UseCors("AllowSpecificOrigins");

app.MapGet("/", () => "Hello World!");

app.RegisterUserEndpoints();
app.RegisterAuthEndpoints();
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseForwardedHeaders();
    app.MapScalarApiReference();
}
app.Run();
