using SchedulingServer.Models.RefreshToken;

namespace SchedulingServer.Services;

public interface IRefreshTokenService
{
    Task<RefreshToken?> GetRefreshTokenAsync(string refreshToken, string email);
    Task CreateRefreshTokenAsync(string refreshToken, string email);
}