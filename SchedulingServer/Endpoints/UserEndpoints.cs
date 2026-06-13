using SchedulingServer.Models;
using SchedulingServer.Services;

namespace SchedulingServer.Endpoints;

public static class UserEndpoints
{
    public static void RegisterUserEndpoints(this WebApplication app) 
    {
        app.MapGet("/users/all", async (IUserService userService) => await userService.GetAllUsersAsync());
    }
}