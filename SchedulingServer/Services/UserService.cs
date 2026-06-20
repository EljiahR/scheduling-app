using Microsoft.EntityFrameworkCore;
using SchedulingServer.Data;
using SchedulingServer.Models.User;

namespace SchedulingServer.Services;

public class UserService(ScheduleContext context): IUserService
{
    private readonly DbSet<User> _users = context.Set<User>();

    public async Task<IEnumerable<User>> GetAllUsersAsync() => await _users.ToListAsync();
}