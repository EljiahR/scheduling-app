using Microsoft.AspNetCore.Identity;
using SchedulingServer.Models.Punches;

namespace SchedulingServer.Models.User;

public class User : IdentityUser
{
    public string? PrimaryJobId { get; set; }
    public IEnumerable<Punch> Punches { get; set; } = new List<Punch>();
}