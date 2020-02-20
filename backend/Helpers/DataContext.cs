using backend.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Helpers
{
    public class DataContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public DataContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sql server database
            // options.UseSqlServer(Configuration.GetConnectionString("WebApiDatabaseForum"));
            // connect to postgresql database
            //options.UseNpgsql(Configuration.GetConnectionString("WebApiDatabaseForum"));
            options.UseNpgsql("Host=ec2-52-71-122-102.compute-1.amazonaws.com;Port=5432;Username=ajohmagtaptxbj;Password=35989373fe41f8b7a6a48be9199fb59e399265afb5ce6203df900e73b1aafbd4;Database=d4nq23tkvso5bk;");
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}
