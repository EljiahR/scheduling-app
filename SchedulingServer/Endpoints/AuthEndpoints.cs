using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.IdentityModel.Protocols;
using SchedulingServer.Helpers;
using SchedulingServer.Models;
using SchedulingServer.Models.RefreshToken;
using SchedulingServer.Services;

namespace SchedulingServer.Endpoints;

public static class AuthEndpoints
{
    public static void RegisterAuthEndpoints(this WebApplication app)
    {
        app.MapPost("/auth/signin", async Task<Results<Ok<TokenDto>, UnauthorizedHttpResult>> (UserFromBody body, JwtService jwtService, RefreshTokenService refreshTokenService, HttpRequestData request) => 
        {
            if (body.Email == "admin@admin.com" && body.Password == "password")
            {
                var token = jwtService.GenerateToken(body.Email);
                var refreshToken = await refreshTokenService.AddRefreshTokenAsync(jwtService.GenerateRefreshToken(body.Email, GetClientIp(request)));

                return TypedResults.Ok(await GetNewTokens(body.Email, jwtService, refreshTokenService));
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

        app.MapPost("/auth/refreshToken", async Task<Results<Ok<TokenDto>, UnauthorizedHttpResult>>(RefreshTokenFromBody refreshToken, JwtService jwtService, RefreshTokenService refreshTokenService, HttpRequestData request) => 
        {
            var currentTime = DateTime.Now;
            if (refreshToken.Token == null)
            {
                return TypedResults.Unauthorized();
            }
            var existingToken = await refreshTokenService.GetRefreshTokenAsync(refreshToken.Token);

            // Get ip here
            var ipAddress = GetClientIp(request);

            if (existingToken == null || existingToken.UserEmail != refreshToken.UserEmail || ipAddress != existingToken.IpAddress || DateTime.Compare(currentTime, existingToken.ExpirationDate) >= 0) 
            {
                return TypedResults.Unauthorized();
            }
            

            return TypedResults.Ok(await GetNewTokens(refreshToken.UserEmail, jwtService, refreshTokenService));
        });
    }

    private static async Task<TokenDto> GetNewTokens(string email, JwtService jwtService, RefreshTokenService refreshTokenService)
    {
        var token = jwtService.GenerateToken(email);
        var refreshToken = await refreshTokenService.AddRefreshTokenAsync(jwtService.GenerateRefreshToken(email));

        return new TokenDto 
        {
            Token = token,
            RefreshToken = refreshToken.Token
        };     
    }

    private static string GetClientIp(HttpRequestData request)
    {
        var clientIp = "";
        
        if (request.Headers.TryGetValue("X-Forwarded-For", out var forwardedFor))
        {
            clientIp = forwardedFor.FirstOrDefault()?.Split(",")[0]?.Trim();
        }

        if (string.IsNullOrWhiteSpace(clientIp) && request.Headers.TryGetValue("REMOTE_ADDR", out var remoteAddress))
        {
            clientIp = remoteAddress.FirstOrDefault()?.Split(",")[0]?.Trim();;
        }

        return clientIp ?? "";

    }
}