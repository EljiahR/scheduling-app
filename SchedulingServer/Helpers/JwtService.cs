using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

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

        
    }
}