using Microsoft.EntityFrameworkCore;
using SchedulingServer.Data;
using SchedulingServer.Helpers;
using SchedulingServer.Models.RefreshToken;

namespace SchedulingServer.Services;

public class RefreshTokenService(ScheduleContext context, IConfiguration config) : IRefreshTokenService
{
    private readonly DbSet<RefreshToken> _refreshTokens = context.Set<RefreshToken>();
    public async Task<RefreshToken?> GetRefreshTokenAsync(string refreshToken, string email) {
        var existingTokens = await _refreshTokens.Where((token) => token.UserEmail == email).ToListAsync();
        
        var matchedToken = existingTokens.FirstOrDefault((token) => JwtService.VerifyToken(refreshToken, token.HashedToken));

        if (matchedToken != null)
        {
            _refreshTokens.Remove(matchedToken);
            await context.SaveChangesAsync();
        }

        return matchedToken;
    }

    public async Task CreateRefreshTokenAsync(string refreshToken, string email)
    {
        // var existingIpTokens = await _refreshTokens.Where((token) => token.IpAddress == refreshToken.IpAddress).ToListAsync();
        // _refreshTokens.RemoveRange(existingIpTokens);

        await _refreshTokens.AddAsync(new() 
        {
            HashedToken = JwtService.HashToken(refreshToken),
            UserEmail = email,
            ExpirationDate = DateTime.Now.AddDays(Convert.ToDouble(config["Jwt:DurationInDays"]))
        });

        await context.SaveChangesAsync();
    }   
}