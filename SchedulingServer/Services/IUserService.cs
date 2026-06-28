using SchedulingServer.Models.User;

namespace SchedulingServer.Services;

public interface IUserService
{
    Task<IEnumerable<User>> GetAllUsersAsync();
    Task<User?> GetUserAsync(string userId);
}