using Microsoft.EntityFrameworkCore;
using SchedulingServer.Data;
using SchedulingServer.Endpoints;
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

builder.Services.AddAuthentication().AddJwtBearer();
builder.Services.AddAuthorization();

builder.Services.AddScoped<IUserService, UserService>();
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.RegisterUserEndpoints();
app.Run();
