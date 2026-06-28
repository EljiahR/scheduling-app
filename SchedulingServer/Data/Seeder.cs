using Microsoft.AspNetCore.Identity;
using SchedulingServer.Models.User;

namespace SchedulingServer.Data;

public static class Seeder
{
    public static async Task SeedUser(UserManager<User> userManager, string userName, string email, string password)
    {
        var existingSeed = await userManager.FindByEmailAsync(email);
        if (existingSeed != null)
        {
            return;
        }

        var seededUser = new User
        {
            UserName = userName,
            Email = email
        };

        var result = await userManager.CreateAsync(seededUser, password);

        if (result.Succeeded) 
        {
            Console.WriteLine("User was seeded");
        } else 
        {
            Console.WriteLine("User was not seeded");
            Console.WriteLine(result.Errors.FirstOrDefault()?.Description);
        }
    }
}