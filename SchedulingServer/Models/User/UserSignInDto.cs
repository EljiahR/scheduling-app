namespace SchedulingServer.Models.User;

public class UserSignInDto 
{
    public required string AccessToken { get; set; }
    public required string RefreshToken { get; set; }
}