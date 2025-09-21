using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Postagens.Data;
using Postagens.DTOs;
using Postagens.Models;
using Postagens.Server.Services;
using System.Security.Cryptography;
using System.Text;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly TokenService _tokenService;
    private readonly byte[] _hmacKey;

    public AuthController(AppDbContext context, TokenService tokenService, IConfiguration configuration)
    {
        _context = context;
        _tokenService = tokenService;
        _hmacKey = Encoding.UTF8.GetBytes(configuration["Jwt:Key"]); // pega a chave do JWT
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        if (await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email) != null)
            return BadRequest("E-mail já cadastrado.");

        if(dto.Email.Length < 6)
            return BadRequest("Digite um e-mail valido.");

        using var hmac = new HMACSHA256(_hmacKey);
        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.Password)))
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Usuário registrado com sucesso!" });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null) return Unauthorized("Credenciais inválidas.");

        using var hmac = new HMACSHA256(_hmacKey);
        var hash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(dto.Password)));

        if (hash != user.PasswordHash) return Unauthorized("Credenciais inválidas.");

        var token = _tokenService.GenerateToken(user);

        return Ok(new { token });
    }
}
