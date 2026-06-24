using Microsoft.AspNetCore.Http.HttpResults;
using SchedulingServer.Helpers;
using SchedulingServer.Models;
using SchedulingServer.Models.RefreshToken;
using SchedulingServer.Services;

namespace SchedulingServer.Endpoints;

public static class AuthEndpoints
{
    public static void RegisterAuthEndpoints(this WebApplication app)
    {
        app.MapPost("/auth/signin", async Task<Results<Ok<TokenDto>, UnauthorizedHttpResult>> (UserFromBody body, JwtService jwtService, RefreshTokenService refreshTokenService) => 
        {
            if (body.Email == "admin@admin.com" && body.Password == "password")
            {
                var token = jwtService.GenerateToken(body.Email);
                var refreshToken = await refreshTokenService.AddRefreshTokenAsync(jwtService.GenerateRefreshToken(""));

                return TypedResults.Ok(new TokenDto 
                    {
                        Token = token,
                        RefreshToken = refreshToken.Token
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