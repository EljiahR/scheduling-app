using Microsoft.AspNetCore.Identity;

namespace SchedulingServer.Models.User;

public class User : IdentityUser
{
    public string? PrimaryJobId { get; set; }
}