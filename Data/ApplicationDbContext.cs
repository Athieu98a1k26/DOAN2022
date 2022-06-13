using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Configuration;
using Rws.Models;
using Rws.Services;

namespace Rws.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
        }

        public override int SaveChanges()
        {
            this.SetDatesToUtc(this.ChangeTracker.Entries());
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            this.SetDatesToUtc(this.ChangeTracker.Entries());
            return base.SaveChangesAsync(cancellationToken);
        }

        private void SetDatesToUtc(IEnumerable<EntityEntry> changes)
        {

            foreach (var dbEntry in changes.Where(x => x.State == EntityState.Added || x.State == EntityState.Modified))
            {
                var properties = dbEntry.Properties
                    .Where(x => x.Metadata.ClrType == typeof(DateTime) || x.Metadata.ClrType == typeof(DateTime?));

                foreach (var property in properties)
                {
                    //property.ism
                    if ((property.EntityEntry.State == EntityState.Added || property.IsModified) && property.CurrentValue != null)
                    {
                        var value = property.CurrentValue;
                        var dt = property.Metadata.ClrType == typeof(DateTime?) ? (DateTime?)value : (DateTime)value;

                        if (dt.Value.Kind != DateTimeKind.Utc)
                        {
                            property.CurrentValue = dt.Value.ToUniversalTime();
                        }
                    }
                }
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //========================================================================
            // Tên bảng cho các bảng identity
            builder.Entity<ApplicationUser>().ToTable("Users");
            builder.Entity<Role>().ToTable("Roles");
            builder.Entity<IdentityUserToken<int>>().ToTable("UserTokens");
            builder.Entity<IdentityRoleClaim<int>>().ToTable("RoleClaims");
            builder.Entity<UserRole>().ToTable("UserRoles");
            builder.Entity<IdentityUserClaim<int>>().ToTable("UserClaims");
            builder.Entity<IdentityUserLogin<int>>().ToTable("UserLogins");

            //========================================================================
            // Tên bảng cho các bảng không được khai báo DbSet (bảng phụ)


            //========================================================================
            // Liên kết bảng identity
            builder.Entity<ApplicationUser>()
                .HasMany(e => e.Claims)
                .WithOne()
                .HasForeignKey(e => e.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<ApplicationUser>()
                .HasMany(e => e.Logins)
                .WithOne()
                .HasForeignKey(e => e.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<ApplicationUser>()
                .HasMany(e => e.Roles)
                .WithOne(e => e.User)
                .HasPrincipalKey(e => e.Id)
                .HasForeignKey(e => e.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Role>()
                .HasMany(e => e.Claims)
                .WithOne()
                .HasForeignKey(e => e.RoleId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Role>()
                .HasMany(e => e.Users)
                .WithOne(e => e.Role)
                .HasPrincipalKey(e => e.Id)
                .HasForeignKey(e => e.RoleId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<TblGiangVienPhongBan>().HasKey(e => new { e.GiangVienId, e.PhongBanId });

        }

        // public DbSet<Option> Options { get; set; }  //option
        // public DbSet<Log> Logs { get; set; }
        // public DbSet<Attachment> Attachments { get; set; }


        public DbSet<TblNhiemVu> TblNhiemVus { get; set; }
        public DbSet<TblDaoTao> TblDaoTaos { get; set; }
        public DbSet<TblNghiepVu> TblNghiepVus { get; set; }
        public DbSet<TblChuyenMon> TblChuyenMons { get; set; }
        public DbSet<TblGiangVien> TblGiangViens { get; set; }
        public DbSet<TblDonVi> TblDonVis { get; set; }
        public DbSet<TblPhongBan> TblPhongBans { get; set; }
        public DbSet<TblGiangVienPhongBan> TblGiangVienPhongBans { get; set; }
        public DbSet<TblSinhVien> SinhViens { get; set; }
        public DbSet<TblKhoaDaoTao> KhoaDaoTaos { get; set; }
    }
}