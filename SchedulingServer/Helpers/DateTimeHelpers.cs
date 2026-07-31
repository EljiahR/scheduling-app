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
        return new DateTime(time.Year, time.Month, time.Day, 23, 59, 59);
    }
    
    public static DateTime GetSpecificDayOfWeek(DateTime date, DayOfWeek dayOfWeek = DayOfWeek.Sunday)
    {      
        var dayDiff = dayOfWeek - date.DayOfWeek; 
        var specificDay = date.AddDays(dayDiff);
        
        return specificDay.Date;
    }
}