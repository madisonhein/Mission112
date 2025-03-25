using Microsoft.EntityFrameworkCore;

namespace Mission112.API.data
{
    public class BookstoreDbContext : DbContext
    {
        public BookstoreDbContext(DbContextOptions<BookstoreDbContext> options) : base(options)
        {
        }

        public DbSet<Project> Books { get; set; }
    }
}