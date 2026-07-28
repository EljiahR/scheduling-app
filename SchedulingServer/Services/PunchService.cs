using Microsoft.EntityFrameworkCore;
using SchedulingServer.Data;
using SchedulingServer.Helpers;
using SchedulingServer.Models.Punches;

namespace SchedulingServer.Services;

public class PunchServices(ScheduleContext context) : IPunchService
{
    private readonly DbSet<Punch> _punches = context.Set<Punch>();
    public async Task<Punch?> SendPunchAsync(string userId, bool inPunch)
    {
        var currentTime = DateTimeHelpers.StripSeconds(DateTime.UtcNow);

        // Checking for duplicate punches
        var existingPunch = await _punches.FirstOrDefaultAsync((punch) => punch.Time == currentTime && userId == punch.UserId);

        if (existingPunch != null)
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

    public async Task<Punch?> SendPunchWithTimeAsync(string userId, bool inPunch, DateTime time)
    {
        var currentTime = DateTimeHelpers.StripSeconds(time);

        // Checking for duplicate punches
        var existingPunch = await _punches.FirstOrDefaultAsync((punch) => punch.Time == currentTime && userId == punch.UserId);

        if (existingPunch != null)
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

    public async Task<Punch?> GetUserLastPunchAsync(string userId)
    {
        var punches = await _punches.OrderBy((punch) => punch.InPunch).ToListAsync();

        if (punches.Count == 0)
        {
            return null;
        }

        return punches[0];
    }

    public async Task<IEnumerable<Punch>> GetUserAllPunchesAsync(string userId)
    {
        return await _punches.OrderBy((punch) => punch.InPunch).ToListAsync();
    }

    public async Task<IEnumerable<Punch>> GetUserPunchesInRangeAsync(string userId, DateTime startDay, DateTime endDay)
    {
        DateTimeOffset startDayFixed = DateTime.SpecifyKind(startDay, DateTimeKind.Utc);
        DateTimeOffset endDayFixed = DateTime.SpecifyKind(endDay, DateTimeKind.Utc);

        return await _punches.Where((p) => DateTimeOffset.Compare(startDayFixed, p.Time) <= 0 && DateTimeOffset.Compare(p.Time, endDayFixed) <= 0).ToListAsync();
    }

}