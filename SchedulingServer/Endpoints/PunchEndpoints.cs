using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using SchedulingServer.Helpers;
using SchedulingServer.Models.Punches;
using SchedulingServer.Services;

namespace SchedulingServer.Endpoints;

public static class PunchEndpoints
{
    public static void RegisterPunchEndpoints(this WebApplication app)
    {
        app.MapGet("/timecard", [Authorize] async (HttpContext context, IPunchService punchService) => 
        {
            var user = context.User;

            if (user?.Identity?.IsAuthenticated != true)
            {
                return Results.Unauthorized();
            }

            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrWhiteSpace(userId))
            {
                return Results.Unauthorized();
            }

            var punches = await punchService.GetUserAllPunchesAsync(userId);

            return Results.Ok(punches);
        });
        
        app.MapGet("/timecard/punch", [Authorize] async (bool inPunch, HttpContext context, IPunchService punchService) => 
        {
            var user = context.User;

            if (user?.Identity?.IsAuthenticated != true)
            {
                return Results.Unauthorized();
            }

            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrWhiteSpace(userId))
            {
                return Results.Unauthorized();
            }

            var newPunch = await punchService.SendPunchAsync(userId, inPunch);

            if (newPunch == null)
            {
                return Results.BadRequest("Duplicate punch.");
            }

            return Results.Ok(newPunch);
        });

        app.MapGet("/timecard/weekly", [Authorize] async (HttpContext context, string? dateAsString, IPunchService punchService) => {
            var user = context.User;

            if (user?.Identity?.IsAuthenticated != true)
            {
                return Results.Unauthorized();
            }

            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrWhiteSpace(userId))
            {
                return Results.Unauthorized();
            }
            
            if (string.IsNullOrWhiteSpace(dateAsString))
            {
                // get current week
                var currentDay = DateTime.UtcNow;

                var currentWeekSunday = DateTimeHelpers.GetSpecificDayOfWeek(currentDay);
                var currentWeekSaturday = DateTimeHelpers.GetLastPossibleTime(DateTimeHelpers.GetSpecificDayOfWeek(currentDay, DayOfWeek.Saturday));
            
                var punches = await punchService.GetUserPunchesInRangeAsync(userId, currentWeekSunday, currentWeekSaturday);
                var congregatedPunches = CongregatePunches(punches);

                return Results.Ok(congregatedPunches);
            }

            if (DateTime.TryParse(dateAsString, out var parsedDate))
            {
                // get week of parsed date
                var parsedWeekSunday = DateTimeHelpers.GetSpecificDayOfWeek(parsedDate);
                var parsedWeekSaturday = DateTimeHelpers.GetLastPossibleTime(DateTimeHelpers.GetSpecificDayOfWeek(parsedDate, DayOfWeek.Saturday));
            
                var punches = await punchService.GetUserPunchesInRangeAsync(userId, parsedWeekSunday, parsedWeekSaturday);
                var congregatedPunches = CongregatePunches(punches);

                return Results.Ok(congregatedPunches);
            }

            return Results.BadRequest();
        });
    }

    public static List<DailyPunches> CongregatePunches(IEnumerable<Punch> punches)
    {
        var congregatedPunches = new List<DailyPunches>();
        foreach (var punch in punches)
        {
            var existingDay = congregatedPunches.FirstOrDefault((daily) => daily.Day.Date == punch.Time.Date);

            if (existingDay == null)
            {
                existingDay = new DailyPunches 
                {
                    Day = punch.Time.Date
                };
                congregatedPunches.Add(existingDay);
            }

            existingDay.Punches.Add(punch);
        }

        return congregatedPunches;
    }
}