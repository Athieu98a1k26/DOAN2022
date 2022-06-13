using Microsoft.EntityFrameworkCore.Migrations;

namespace Rws.Migrations
{
    public partial class chantb1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TblGiangViens_TblDonVis_KhoaId",
                table: "TblGiangViens");

            migrationBuilder.DropIndex(
                name: "IX_TblGiangViens_KhoaId",
                table: "TblGiangViens");

            migrationBuilder.DropColumn(
                name: "KhoaId",
                table: "TblGiangViens");

            migrationBuilder.DropColumn(
                name: "TenKhoa",
                table: "TblDonVis");

            migrationBuilder.AddColumn<int>(
                name: "DonViId",
                table: "TblGiangViens",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "TenDonVi",
                table: "TblDonVis",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TblGiangViens_DonViId",
                table: "TblGiangViens",
                column: "DonViId");

            migrationBuilder.AddForeignKey(
                name: "FK_TblGiangViens_TblDonVis_DonViId",
                table: "TblGiangViens",
                column: "DonViId",
                principalTable: "TblDonVis",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TblGiangViens_TblDonVis_DonViId",
                table: "TblGiangViens");

            migrationBuilder.DropIndex(
                name: "IX_TblGiangViens_DonViId",
                table: "TblGiangViens");

            migrationBuilder.DropColumn(
                name: "DonViId",
                table: "TblGiangViens");

            migrationBuilder.DropColumn(
                name: "TenDonVi",
                table: "TblDonVis");

            migrationBuilder.AddColumn<int>(
                name: "KhoaId",
                table: "TblGiangViens",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "TenKhoa",
                table: "TblDonVis",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TblGiangViens_KhoaId",
                table: "TblGiangViens",
                column: "KhoaId");

            migrationBuilder.AddForeignKey(
                name: "FK_TblGiangViens_TblDonVis_KhoaId",
                table: "TblGiangViens",
                column: "KhoaId",
                principalTable: "TblDonVis",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
