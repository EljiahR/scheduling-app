using SchedulingServer.Models;

namespace SchedulingServer.Services;

public interface IPunchService
{
    Task<Punch?> SendPunchAsync(string userId, bool inPunch);
}