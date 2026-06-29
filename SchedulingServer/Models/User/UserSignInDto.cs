namespace SchedulingServer.Models.User;

public class UserSignInDto 
{
    public required string AccessToken { get; set; }
    public required string RefreshToken { get; set; }
    public required string UserId { get; set; }
    public DateTimeOffset? LastPunch { get; set; } = null;
}