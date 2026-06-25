using Microsoft.EntityFrameworkCore;
using SchedulingServer.Data;
using SchedulingServer.Helpers;
using SchedulingServer.Models.RefreshToken;

namespace SchedulingServer.Services;

public class RefreshTokenService(ScheduleContext context, IConfiguration config) : IRefreshTokenService
{
    private readonly DbSet<RefreshToken> _refreshTokens = context.Set<RefreshToken>();
    public async Task<RefreshToken?> GetRefreshTokenAsync(string refreshToken) {
        var existingToken = await _refreshTokens.FirstAsync((token) => JwtService.VerifyToken(refreshToken, token.HashedToken));
        
        if (existingToken == null)
        {
            return null;
        }

        _refreshTokens.Remove(existingToken);
        await context.SaveChangesAsync();

        return existingToken;
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