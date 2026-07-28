namespace SchedulingServer.Models.Punches;

public class DailyPunches
{
    public DateTimeOffset Day { get; set; } = DateTime.UtcNow;
    public List<Punch> Punches { get; set; } = [];
}