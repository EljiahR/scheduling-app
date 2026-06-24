namespace SchedulingServer.Models.RefreshToken;

public class RefreshTokenDto
{
    public required string Token { get; set; }
    public required DateTime ExpirationDate { get; set; }
}