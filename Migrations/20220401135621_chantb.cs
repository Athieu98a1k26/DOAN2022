using Microsoft.EntityFrameworkCore.Migrations;

namespace Rws.Migrations
{
    public partial class chantb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TblGiangViens_TblKhoas_KhoaId",
                table: "TblGiangViens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TblKhoas",
                table: "TblKhoas");

            migrationBuilder.RenameTable(
                name: "TblKhoas",
                newName: "TblDonVis");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TblDonVis",
                table: "TblDonVis",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TblGiangViens_TblDonVis_KhoaId",
                table: "TblGiangViens",
                column: "KhoaId",
                principalTable: "TblDonVis",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TblGiangViens_TblDonVis_KhoaId",
                table: "TblGiangViens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TblDonVis",
                table: "TblDonVis");

            migrationBuilder.RenameTable(
                name: "TblDonVis",
                newName: "TblKhoas");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TblKhoas",
                table: "TblKhoas",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TblGiangViens_TblKhoas_KhoaId",
                table: "TblGiangViens",
                column: "KhoaId",
                principalTable: "TblKhoas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
