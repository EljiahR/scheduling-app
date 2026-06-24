namespace SchedulingServer.Models.RefreshToken;

public class RefreshTokenFromBody
{
    public string? Token { get; set; }
    public string? UserEmail { get; set; }
}