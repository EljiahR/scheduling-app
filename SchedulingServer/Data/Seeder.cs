using Microsoft.AspNetCore.Identity;
using SchedulingServer.Models.User;

namespace SchedulingServer.Data;

public class Seeder(UserManager<User> userManager)
{
    public async Task SeedUser(string email, string password)
    {
        var existingSeed = await userManager.FindByEmailAsync(email);
        if (existingSeed == null)
        {
            return;
        }

        var seededUser = new User
        {
            Email = email
        };

        await userManager.CreateAsync(seededUser, password);
    }
}