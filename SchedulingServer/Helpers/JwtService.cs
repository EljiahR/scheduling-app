using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using SchedulingServer.Models.RefreshToken;

namespace SchedulingServer.Helpers;

public class JwtService(IConfiguration config)
{
    public string GenerateToken(string email)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, email)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: config["Jwt:Issuer"],
            audience: config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(config["Jwt:DurationInMinutes"])),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public RefreshToken GenerateRefreshToken(string userEmail, string ipAddress = "")
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);

        return new() 
        {
            Token = Convert.ToBase64String(randomNumber),
            UserEmail = userEmail,
            IpAddress = ipAddress,
            ExpirationDate = DateTime.Now.AddHours(Convert.ToDouble(config["Jwt:DurationInHours"]))
        };
    }
}