using SchedulingServer.Models;

namespace SchedulingServer.Services;

public interface IPunchService
{
    Task<Punch?> SendPunchAsync(string userId, bool inPunch);
    Task<Punch?> GetUserLastPunchAsync(string userId);
    Task<IEnumerable<Punch>> GetUserAllPunchesAsync(string userId);
}