using Microsoft.EntityFrameworkCore.Migrations;

namespace Rws.Migrations
{
    public partial class kgkg : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TblPhongBanId",
                table: "TblGiangViens",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TblGiangViens_TblPhongBanId",
                table: "TblGiangViens",
                column: "TblPhongBanId");

            migrationBuilder.AddForeignKey(
                name: "FK_TblGiangViens_TblPhongBans_TblPhongBanId",
                table: "TblGiangViens",
                column: "TblPhongBanId",
                principalTable: "TblPhongBans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TblGiangViens_TblPhongBans_TblPhongBanId",
                table: "TblGiangViens");

            migrationBuilder.DropIndex(
                name: "IX_TblGiangViens_TblPhongBanId",
                table: "TblGiangViens");

            migrationBuilder.DropColumn(
                name: "TblPhongBanId",
                table: "TblGiangViens");
        }
    }
}
