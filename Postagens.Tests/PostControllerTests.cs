using Xunit;
using Microsoft.EntityFrameworkCore;
using Postagens.Controllers;
using Postagens.Data;
using Postagens.Server.Models;
using Postagens.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class PostsControllerTests
{
    private AppDbContext GetDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: System.Guid.NewGuid().ToString()) // banco isolado por teste
            .Options;

        return new AppDbContext(options);
    }

    [Fact]
    public async Task GetPostsValid()
    {
        var context = GetDbContext();
        context.Posts.Add(new Post { Title = "Post 1", Content = "Conteúdo 1" });
        context.Posts.Add(new Post { Title = "Post 2", Content = "Conteúdo 2" });
        await context.SaveChangesAsync();

        var controller = new PostsController(context);
        var result = await controller.GetPosts();

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var posts = Assert.IsAssignableFrom<IEnumerable<Post>>(okResult.Value);
        Assert.Equal(2, posts.Count());
    }

    [Fact]
    public async Task GetPostValid()
    {
        var context = GetDbContext();
        var post = new Post { Title = "Post Test", Content = "Conteúdo Test" };
        context.Posts.Add(post);
        await context.SaveChangesAsync();

        var controller = new PostsController(context);
        var result = await controller.GetPost(post.Id);

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedPost = Assert.IsType<Post>(okResult.Value);
        Assert.Equal(post.Title, returnedPost.Title);
    }

    [Fact]
    public async Task GetPostInvalid()
    {
        var context = GetDbContext();
        var controller = new PostsController(context);

        var result = await controller.GetPost(999);

        Assert.IsType<NotFoundResult>(result.Result);
    }

    [Fact]
    public async Task CreatePostValid()
    {
        var context = GetDbContext();
        var controller = new PostsController(context);
        var dto = new PostCreateDto { Title = "Novo Post", Content = "Novo Conteúdo" };

        var result = await controller.CreatePost(dto);

        var createdAtAction = Assert.IsType<CreatedAtActionResult>(result.Result);
        var post = Assert.IsType<Post>(createdAtAction.Value);
        Assert.Equal(dto.Title, post.Title);
        Assert.Single(context.Posts);
    }

    [Fact]
    public async Task UpdatePostValid()
    {
        var context = GetDbContext();
        var post = new Post { Title = "Old Title", Content = "Old Content" };
        context.Posts.Add(post);
        await context.SaveChangesAsync();

        var controller = new PostsController(context);
        var dto = new PostUpdateDto { Title = "Updated Title", Content = "Updated Content" };

        var result = await controller.UpdatePost(post.Id, dto);

        Assert.IsType<NoContentResult>(result);
        var updatedPost = context.Posts.First();
        Assert.Equal(dto.Title, updatedPost.Title);
        Assert.Equal(dto.Content, updatedPost.Content);
    }

    [Fact]
    public async Task UpdatePostInvalid()
    {
        var context = GetDbContext();
        var controller = new PostsController(context);
        var dto = new PostUpdateDto { Title = "Test", Content = "Test" };

        var result = await controller.UpdatePost(999, dto);

        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task DeletePostValid()
    {
        var context = GetDbContext();
        var post = new Post { Title = "Post To Delete", Content = "Content" };
        context.Posts.Add(post);
        await context.SaveChangesAsync();

        var controller = new PostsController(context);
        var result = await controller.DeletePost(post.Id);

        Assert.IsType<NoContentResult>(result);
        Assert.Empty(context.Posts);
    }

    [Fact]
    public async Task DeletePostInvalid()
    {
        var context = GetDbContext();
        var controller = new PostsController(context);

        var result = await controller.DeletePost(999);

        Assert.IsType<NotFoundResult>(result);
    }
}
