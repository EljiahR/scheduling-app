using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SchedulingServer.Models;
using SchedulingServer.Models.RefreshToken;
using SchedulingServer.Models.User;

namespace SchedulingServer.Data;

public class ScheduleContext : IdentityDbContext<User>
{
    public ScheduleContext(DbContextOptions<ScheduleContext> options) : base(options) 
    {
        Database.EnsureCreated();
    }

    public required DbSet<Job> Jobs { get; set; }
    public required DbSet<Shift> Shifts { get; set; }
    public required DbSet<RefreshToken> RefreshTokens { get; set; }
}