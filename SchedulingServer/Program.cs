using Microsoft.EntityFrameworkCore;
using SchedulingServer.Data;

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
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
