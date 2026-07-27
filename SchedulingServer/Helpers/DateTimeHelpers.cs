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

    public static DateTime GetLastPossibleTime(DateTime time)
    {
        return StripSeconds(time).AddDays(1).AddTicks(-1);
    }
    
    public static DateTime GetSpecificDayOfWeek(DateTime date, DayOfWeek dayOfWeek = DayOfWeek.Sunday)
    {
        var strippedDate = StripSeconds(date);
        
        var dayDiff = dayOfWeek - strippedDate.DayOfWeek; 
        strippedDate.AddDays(dayDiff);
        
        return StripSeconds(date);
    }
}