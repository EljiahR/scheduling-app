using Microsoft.AspNetCore.Http.HttpResults;
using SchedulingServer.Helpers;
using SchedulingServer.Models;
using SchedulingServer.Models.RefreshToken;

namespace SchedulingServer.Endpoints;

public static class AuthEndpoints
{
    public static void RegisterAuthEndpoints(this WebApplication app)
    {
        app.MapPost("/auth/signin", Results<Ok<TokenDto>, UnauthorizedHttpResult> (UserFromBody body, JwtService jwtService) => 
        {
            if (body.Email == "admin@admin.com" && body.Password == "password")
            {
                var token = jwtService.GenerateToken(body.Email);

                return TypedResults.Ok(new TokenDto 
                    {
                        Token = token,
                        RefreshToken = ""
                    }
                 );
            }

            return TypedResults.Unauthorized();
        });

        app.MapGet("/auth/status", Results<Ok<string>, UnauthorizedHttpResult> (RefreshTokenFromBody body, HttpContext context) => 
        {
            if (context.User.Identity?.IsAuthenticated ?? false)
            {

                return TypedResults.Ok("Authorized.");
            }

            return TypedResults.Unauthorized();
        });
    }
}