using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Postagens.Data;
using Postagens.DTOs;
using Postagens.Models;
using Postagens.Server.Services;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

public class AuthControllerTests
{
    private AppDbContext GetDbContext(string dbName)
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: dbName)
            .Options;

        return new AppDbContext(options);
    }

    private TokenService GetTokenService()
    {
        var inMemorySettings = new Dictionary<string, string> {
            {"Jwt:Key", "chave_super_secreta_1999_muito_segura_1234567890!"},
            {"Jwt:Issuer", "PostagensServer"},
            {"Jwt:Audience", "PostagensClient"}
        };
        IConfiguration configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(inMemorySettings)
            .Build();

        return new TokenService(configuration);
    }

    private IConfiguration GetConfiguration()
    {
        var inMemorySettings = new Dictionary<string, string> {
            {"Jwt:Key", "chave_super_secreta_1999_muito_segura_1234567890!"}
        };
        return new ConfigurationBuilder().AddInMemoryCollection(inMemorySettings).Build();
    }

    [Fact]
    public async Task RegisterCreateUser()
    {
        // Arrange
        var context = GetDbContext(System.Guid.NewGuid().ToString());
        var tokenService = GetTokenService();
        var configuration = GetConfiguration();

        var controller = new AuthController(context, tokenService, configuration);
        var dto = new RegisterDto { Name = "Thiago", Email = "thiago@test.com", Password = "123456" };

        // Act
        var result = await controller.Register(dto);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var messageProp = okResult.Value.GetType().GetProperty("message");
        var message = messageProp.GetValue(okResult.Value, null) as string;

        Assert.Equal("Usuário registrado com sucesso!", message);
        Assert.Single(context.Users);
    }

    [Fact]
    public async Task LoginValid()
    {
        // Arrange
        var context = GetDbContext(System.Guid.NewGuid().ToString());
        var tokenService = GetTokenService();
        var configuration = GetConfiguration();

        var controller = new AuthController(context, tokenService, configuration);

        // cria usuário no banco
        using var hmac = new System.Security.Cryptography.HMACSHA256(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
        var user = new User
        {
            Name = "Thiago",
            Email = "thiago@test.com",
            PasswordHash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes("123456")))
        };
        context.Users.Add(user);
        await context.SaveChangesAsync();

        var loginDto = new LoginDto { Email = "thiago@test.com", Password = "123456" };

        // Act
        var result = await controller.Login(loginDto);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var tokenProp = okResult.Value.GetType().GetProperty("token");
        var token = tokenProp.GetValue(okResult.Value, null) as string;

        Assert.False(string.IsNullOrWhiteSpace(token));
        Assert.Contains(".", token); // checa se é JWT
    }

    [Fact]
    public async Task LoginInvalid()
    {
        // Arrange
        var context = GetDbContext(System.Guid.NewGuid().ToString());
        var tokenService = GetTokenService();
        var configuration = GetConfiguration();

        var controller = new AuthController(context, tokenService, configuration);

        var loginDto = new LoginDto { Email = "naoexiste@test.com", Password = "123456" };

        // Act
        var result = await controller.Login(loginDto);

        // Assert
        var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(result);
        Assert.Equal("Credenciais inválidas.", unauthorizedResult.Value);
    }
}
