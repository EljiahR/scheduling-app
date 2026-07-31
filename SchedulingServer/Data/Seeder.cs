using Microsoft.AspNetCore.Identity;
using SchedulingServer.Models.User;
using SchedulingServer.Services;

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

    public static async Task SeedUserPunches(UserManager<User> userManager, IPunchService punchService, string userEmail)
    {
        var existingUser = await userManager.FindByEmailAsync(userEmail);
        if (existingUser == null)
        {
            return;
        }

        await punchService.SendPunchWithTimeAsync(existingUser.Id, true, DateTime.UtcNow.AddDays(-7));
        await punchService.SendPunchWithTimeAsync(existingUser.Id, false, DateTime.UtcNow.AddDays(-7).AddHours(4));

        await punchService.SendPunchWithTimeAsync(existingUser.Id, true, DateTime.UtcNow.AddDays(-3));
        await punchService.SendPunchWithTimeAsync(existingUser.Id, false, DateTime.UtcNow.AddDays(-3).AddHours(4));

        await punchService.SendPunchWithTimeAsync(existingUser.Id, true, DateTime.UtcNow.AddDays(-2));
        await punchService.SendPunchWithTimeAsync(existingUser.Id, false, DateTime.UtcNow.AddDays(-2).AddHours(4));

        await punchService.SendPunchWithTimeAsync(existingUser.Id, true, DateTime.UtcNow.AddDays(-1));
        await punchService.SendPunchWithTimeAsync(existingUser.Id, false, DateTime.UtcNow.AddDays(-1).AddHours(4));
    }
}