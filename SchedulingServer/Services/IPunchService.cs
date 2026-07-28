using SchedulingServer.Models.Punches;

namespace SchedulingServer.Services;

public interface IPunchService
{
    Task<Punch?> SendPunchAsync(string userId, bool inPunch);
    Task<Punch?> SendPunchWithTimeAsync(string userId, bool inPunch, DateTime time);
    Task<Punch?> GetUserLastPunchAsync(string userId);
    Task<IEnumerable<Punch>> GetUserAllPunchesAsync(string userId);
    Task<IEnumerable<Punch>> GetUserPunchesInRangeAsync(string userId, DateTime startDay, DateTime endDay);
}