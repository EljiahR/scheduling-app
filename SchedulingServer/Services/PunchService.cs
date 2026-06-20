using Microsoft.EntityFrameworkCore;
using SchedulingServer.Data;
using SchedulingServer.Models;

namespace SchedulingServer.Services;

public class PunchServices(ScheduleContext context) : IPunchService
{
    private readonly DbSet<Punch> _punches = context.Set<Punch>();
    public async Task<Punch?> SendPunchAsync(string userId, bool inPunch)
    {
        var currentTime = DateTime.Now;
        currentTime.AddSeconds(-currentTime.Second);

        // Checking for duplicate punches
        var existingPunch = await _punches.FirstAsync((punch) => punch.Time == currentTime && userId == punch.UserId);

        if (existingPunch == null)
        {
            return null;
        }

        var newPunch = new Punch
        {
            Time = currentTime,
            InPunch = inPunch,
            UserId = userId, 
        };

        await _punches.AddAsync(newPunch);
        await context.SaveChangesAsync();

        return newPunch;
    }
}