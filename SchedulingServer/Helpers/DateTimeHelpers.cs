namespace SchedulingServer.Helpers;

public static class DateTimeHelpers
{
    public static DateTime StripSeconds(DateTime timeToStrip)
    {
        return new DateTime
        (
            timeToStrip.Year,
            timeToStrip.Month,
            timeToStrip.Day,
            timeToStrip.Hour,
            timeToStrip.Minute,
            0,
            timeToStrip.Kind
        );
    }
}