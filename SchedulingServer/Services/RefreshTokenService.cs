using Microsoft.EntityFrameworkCore;
using SchedulingServer.Data;
using SchedulingServer.Models.RefreshToken;

namespace SchedulingServer.Services;

public class RefreshTokenService(ScheduleContext context) : IRefreshTokenService
{
    private readonly DbSet<RefreshToken> _refreshTokens = context.Set<RefreshToken>();
    public async Task<RefreshToken?> GetRefreshTokenAsync(string refreshToken) {
        var existingToken = await _refreshTokens.FirstAsync((token) => token.Token == refreshToken);
        
        if (existingToken == null)
        {
            return null;
        }

        _refreshTokens.Remove(existingToken);
        await context.SaveChangesAsync();

        return existingToken;
    }

    public async Task<RefreshToken> AddRefreshTokenAsync(RefreshToken refreshToken)
    {
        var existingIpTokens = await _refreshTokens.Where((token) => token.IpAddress == refreshToken.IpAddress).ToListAsync();
        _refreshTokens.RemoveRange(existingIpTokens);

        await _refreshTokens.AddAsync(refreshToken);

        await context.SaveChangesAsync();

        return refreshToken;
    }   
}