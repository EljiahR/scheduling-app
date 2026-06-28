using Microsoft.EntityFrameworkCore;
using SchedulingServer.Data;
using SchedulingServer.Models;
using SchedulingServer.Models.User;

namespace SchedulingServer.Services;

public class UserService(ScheduleContext context): IUserService
{
    private readonly DbSet<User> _users = context.Set<User>();

    public async Task<IEnumerable<User>> GetAllUsersAsync() => await _users.ToListAsync();

    public async Task<User?> GetUserAsync(string userId) 
    {
        return await _users
            .Include((u) => u.Punches)
            .FirstOrDefaultAsync((u) => u.Id == userId);
    }
}