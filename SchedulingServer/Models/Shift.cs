namespace SchedulingServer.Models;

public class Shift {
    public string Id { get; set; } = Guid.CreateVersion7().ToString();
    public DateTime? StartTime { get; set; } = null;
    public DateTime? EndTime { get; set; } = null;
    public required string JobId { get; set; }
}