using Microsoft.EntityFrameworkCore;
using Postagens.Models;
using System.Collections.Generic;

namespace Postagens.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
