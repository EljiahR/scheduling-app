using SchedulingServer.Models;

namespace SchedulingServer.Services;

public interface IUserService
{
    Task<IEnumerable<User>> GetAllUsersAsync();
}