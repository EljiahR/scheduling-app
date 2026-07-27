using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using SchedulingServer.Models;
using SchedulingServer.Services;

namespace SchedulingServer.Endpoints;

public static class PunchEndpoints
{
    public static void RegisterPunchEndpoints(this WebApplication app)
    {
        app.MapGet("/timecard", [Authorize] async Task<Results<Ok<IEnumerable<Punch>>, UnauthorizedHttpResult>> (HttpContext context, IPunchService punchService) => 
        {
            var user = context.User;

            if (user?.Identity?.IsAuthenticated != true)
            {
                return TypedResults.Unauthorized();
            }

            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrWhiteSpace(userId))
            {
                return TypedResults.Unauthorized();
            }

            var punches = await punchService.GetUserAllPunchesAsync(userId);

            return TypedResults.Ok(punches);
        });
        
        app.MapGet("/timecard/punch", [Authorize] async Task<Results<Ok<Punch>, BadRequest<string>, UnauthorizedHttpResult>> (bool inPunch, HttpContext context, IPunchService punchService) => 
        {
            var user = context.User;

            if (user?.Identity?.IsAuthenticated != true)
            {
                return TypedResults.Unauthorized();
            }

            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrWhiteSpace(userId))
            {
                return TypedResults.Unauthorized();
            }

            var newPunch = await punchService.SendPunchAsync(userId, inPunch);

            if (newPunch == null)
            {
                return TypedResults.BadRequest("Duplicate punch.");
            }

            return TypedResults.Ok(newPunch);
        });

        app.MapGet("/timecard/weekly", [Authorize] async (HttpContext context, string? dateAsString) => {
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
            }

            if (DateTime.TryParse(dateAsString, out var parsedDate))
            {
                // get week of parsed date
            }

            return Results.BadRequest();
        });
    }
}