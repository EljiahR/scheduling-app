namespace SchedulingServer.Models;

public class Punch
{
    public string Id { get; set; } = Guid.CreateVersion7().ToString();  
    public DateTime Time { get; set; } = DateTime.Now;
    public bool InPunch { get; set; } = true;
    public required string UserId { get; set; }
}