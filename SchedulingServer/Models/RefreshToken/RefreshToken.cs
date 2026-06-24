namespace SchedulingServer.Models.RefreshToken;

public class RefreshToken
{
    public required string Token { get; set; }
    public required string UserEmail { get; set; }
    public string? IpAddress { get; set;}
    public required DateTime ExpirationDate { get; set; }
}