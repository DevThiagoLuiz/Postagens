using Microsoft.EntityFrameworkCore;
using Postagens.Models;
using Postagens.Server.Models;
using System.Collections.Generic;

namespace Postagens.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
    }
}
