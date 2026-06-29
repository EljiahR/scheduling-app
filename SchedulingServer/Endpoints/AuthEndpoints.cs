using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using SchedulingServer.Helpers;
using SchedulingServer.Models;
using SchedulingServer.Models.RefreshToken;
using SchedulingServer.Models.User;
using SchedulingServer.Services;

namespace SchedulingServer.Endpoints;

public static class AuthEndpoints
{
    public static void RegisterAuthEndpoints(this WebApplication app)
    {
        app.MapPost("/auth/signin", async Task<Results<Ok<UserSignInDto>, UnauthorizedHttpResult, BadRequest<string>>> (UserFromBody body, IRefreshTokenService refreshTokenService, UserManager<User> userManager, IPunchService punchService, IConfiguration config) => 
        {
            if (string.IsNullOrWhiteSpace(body.Email) || string.IsNullOrWhiteSpace(body.Password))
            {
                return TypedResults.BadRequest("Email and/or password missing.");
            }
            var user = await userManager.FindByEmailAsync(body.Email);    
                
            if (user == null)
            {
                return TypedResults.Unauthorized();
            }

            if (!await userManager.CheckPasswordAsync(user, body.Password))
            {
                return TypedResults.Unauthorized();
            }
                
            var tokens = await GetNewTokens(user.Id, refreshTokenService, config);
            var lastPunch = await punchService.GetUserLastPunchAsync(user.Id);

            return TypedResults.Ok(new UserSignInDto()
            {
                AccessToken = tokens.Token,
                RefreshToken = tokens.RefreshToken,
                UserId = user.Id,
                LastPunch = lastPunch?.Time
            });
        });

        app.MapGet("/auth/status", [Authorize] Results<Ok<string>, UnauthorizedHttpResult> () => 
        {
            return TypedResults.Ok("Authorized.");
        });

        app.MapPost("/auth/refresh", async Task<Results<Ok<UserSignInDto>, UnauthorizedHttpResult>>(HttpContext context, RefreshTokenFromBody refreshToken, IRefreshTokenService refreshTokenService, IPunchService punchService, IConfiguration config) => 
        {
            var currentTime = DateTime.UtcNow;
            if (refreshToken.Token == null || refreshToken.UserId == null)
            {
                return TypedResults.Unauthorized();
            }
            var existingToken = await refreshTokenService.GetRefreshTokenAsync(refreshToken.Token, refreshToken.UserId);

            // Get ip here
            var ipAddress = GetClientIp(context);

            if (existingToken == null || existingToken.UserId != refreshToken.UserId || DateTime.Compare(currentTime, existingToken.ExpirationDate) >= 0) 
            {
                return TypedResults.Unauthorized();
            }

            var lastPunch = await punchService.GetUserLastPunchAsync(existingToken.UserId);
            
            var tokens = await GetNewTokens(refreshToken.UserId, refreshTokenService, config);
            return TypedResults.Ok(new UserSignInDto()
            {
                AccessToken = tokens.Token,
                RefreshToken = tokens.RefreshToken,
                UserId = refreshToken.UserId,
                LastPunch = lastPunch?.Time
            });
        });
    }

    private static async Task<TokenDto> GetNewTokens(string userId, IRefreshTokenService refreshTokenService, IConfiguration config)
    {
        var token = JwtService.GenerateToken(userId, config["Jwt:Key"]!, config["Jwt:Issuer"]!, config["Jwt:Audience"]!, Convert.ToDouble(config["Jwt:DurationInMinutes"]));
        var refreshToken = JwtService.GenerateRefreshToken();
        await refreshTokenService.CreateRefreshTokenAsync(refreshToken, userId);

        return new TokenDto 
        {
            Token = token,
            RefreshToken = refreshToken
        };     
    }

    private static string GetClientIp(HttpContext context)
    {
        string? clientIp = context.Request.Headers["X-Forwarded-For"];

        if (string.IsNullOrWhiteSpace(clientIp) && context.Request.Headers.TryGetValue("REMOTE_ADDR", out var remoteAddress))
        {
            clientIp = context?.Connection?.RemoteIpAddress?.ToString();
        }

        return clientIp ?? "";

    }
}