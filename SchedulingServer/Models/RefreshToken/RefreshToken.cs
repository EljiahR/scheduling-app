namespace SchedulingServer.Models.RefreshToken;

public class RefreshToken
{
    public required string HashedToken { get; set; }
    public required string UserEmail { get; set; }
    public string? IpAddress { get; set;}
    public required DateTime ExpirationDate { get; set; }
}