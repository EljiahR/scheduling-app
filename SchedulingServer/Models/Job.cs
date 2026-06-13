namespace SchedulingServer.Models;

public class Job {
    public string Id { get; set; } = Guid.CreateVersion7().ToString();
    public required string Name { get; set; }
}