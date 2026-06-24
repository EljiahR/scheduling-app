using SchedulingServer.Models.RefreshToken;

namespace SchedulingServer.Services;

public interface IRefreshTokenService
{
    Task<RefreshToken?> GetRefreshTokenAsync(string refreshToken);
    Task<RefreshToken> AddRefreshTokenAsync(RefreshToken refreshToken);
}