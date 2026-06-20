using SchedulingServer.Models.User;

namespace SchedulingServer.Services;

public interface IUserService
{
    Task<IEnumerable<User>> GetAllUsersAsync();
}