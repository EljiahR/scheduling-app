using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace SchedulingServer.Helpers;

public static class JwtService
{
    public static string GenerateToken(string userId, string securityKey, string issuer, string audience, double expirationInMinutes)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userId)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer,
            audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expirationInMinutes),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public static string GenerateRefreshToken()
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);

        return Convert.ToBase64String(randomNumber);
    }

    public static string HashToken(string token)
    {
        var bytes = Encoding.UTF8.GetBytes(token);
        var hash = SHA256.HashData(bytes);
        return Convert.ToBase64String(hash);
    }
    
    public static bool VerifyToken(string token, string hash)
    {
        var hashedToken = HashToken(token);

        return CryptographicOperations.FixedTimeEquals(
            Convert.FromBase64String(hashedToken),
            Convert.FromBase64String(hash)
        );
    }
}