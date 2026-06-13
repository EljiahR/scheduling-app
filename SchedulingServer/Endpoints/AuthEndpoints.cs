using Microsoft.AspNetCore.Http.HttpResults;
using SchedulingServer.Helpers;
using SchedulingServer.Models;

namespace SchedulingServer.Endpoints;

public static class AuthEndpoints
{
    public static void RegisterAuthEndpoints(this WebApplication app)
    {
        app.MapPost("/auth/signintest", Results<Ok<string>, UnauthorizedHttpResult> (UserFromBody body, JwtService jwtService) => 
        {
            if (body.Email == "admin@admin.com" && body.Password == "password")
            {
                var token = jwtService.GenerateToken(body.Email);

                return TypedResults.Ok(token);
            }

            return TypedResults.Unauthorized();
        });
    }
}