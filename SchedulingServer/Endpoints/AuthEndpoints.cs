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
        app.MapPost("/auth/signin", async Task<Results<Ok<TokenDto>, UnauthorizedHttpResult>> (UserFromBody body, RefreshTokenService refreshTokenService, HttpRequestData request, IConfiguration config) => 
        {
            if (body.Email == "admin@admin.com" && body.Password == "password")
            {
                return TypedResults.Ok(await GetNewTokens(body.Email, refreshTokenService, config));
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

        app.MapPost("/auth/refresh", async Task<Results<Ok<TokenDto>, UnauthorizedHttpResult>>(RefreshTokenFromBody refreshToken, RefreshTokenService refreshTokenService, IConfiguration config, HttpRequestData request) => 
        {
            var currentTime = DateTime.Now;
            if (refreshToken.Token == null)
            {
                return TypedResults.Unauthorized();
            }
            var existingToken = await refreshTokenService.GetRefreshTokenAsync(refreshToken.Token);

            // Get ip here
            var ipAddress = GetClientIp(request);

            if (existingToken == null || existingToken.UserEmail != refreshToken.UserEmail || DateTime.Compare(currentTime, existingToken.ExpirationDate) >= 0) 
            {
                return TypedResults.Unauthorized();
            }
            

            return TypedResults.Ok(await GetNewTokens(refreshToken.UserEmail, refreshTokenService, config));
        });
    }

    private static async Task<TokenDto> GetNewTokens(string email, RefreshTokenService refreshTokenService, IConfiguration config)
    {
        var token = JwtService.GenerateToken(email, config["Jwt:Key"]!, config["Jwt:Issuer"]!, config["Jwt:Audience"]!, Convert.ToDouble(config["Jwt:DurationInMinutes"]));
        var refreshToken = JwtService.GenerateRefreshToken();
        await refreshTokenService.CreateRefreshTokenAsync(refreshToken, email);

        return new TokenDto 
        {
            Token = token,
            RefreshToken = refreshToken
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