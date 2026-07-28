namespace SchedulingServer.Models.Punches;

public class Punch
{
    public string Id { get; set; } = Guid.CreateVersion7().ToString();  
    public DateTimeOffset Time { get; set; } = DateTime.UtcNow;
    public bool InPunch { get; set; } = true;
    public required string UserId { get; set; }
}