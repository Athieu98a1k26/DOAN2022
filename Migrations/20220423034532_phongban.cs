using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Rws.Migrations
{
    public partial class phongban : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "NuocNgoai",
                table: "TblGiangViens",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<byte>(
                name: "TrinhDo",
                table: "TblGiangViens",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TblPhongBans",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenPhongBan = table.Column<string>(nullable: true),
                    GhiChu = table.Column<string>(nullable: true),
                    NgayTao = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TblPhongBans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TblGiangVienPhongBans",
                columns: table => new
                {
                    GiangVienId = table.Column<int>(nullable: false),
                    PhongBanId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TblGiangVienPhongBans", x => new { x.GiangVienId, x.PhongBanId });
                    table.ForeignKey(
                        name: "FK_TblGiangVienPhongBans_TblGiangViens_GiangVienId",
                        column: x => x.GiangVienId,
                        principalTable: "TblGiangViens",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TblGiangVienPhongBans_TblPhongBans_PhongBanId",
                        column: x => x.PhongBanId,
                        principalTable: "TblPhongBans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TblGiangVienPhongBans_PhongBanId",
                table: "TblGiangVienPhongBans",
                column: "PhongBanId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TblGiangVienPhongBans");

            migrationBuilder.DropTable(
                name: "TblPhongBans");

            migrationBuilder.DropColumn(
                name: "NuocNgoai",
                table: "TblGiangViens");

            migrationBuilder.DropColumn(
                name: "TrinhDo",
                table: "TblGiangViens");
        }
    }
}
