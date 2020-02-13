using Back.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back.Tools
{
    public class DataContext : DbContext
    {
        public DbSet<Manga> Manga { get; set; }

        public DbSet<Image> Image { get; set; }

        public DbSet<Categorie> Categorie { get; set; }

        public DbSet<Cover> Cover { get; set; }

        public DbSet<Admin> Admin { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=(LocalDb)\TP_Lecture_BD_EnLigne;Integrated Security=True");
        }
    }
}
