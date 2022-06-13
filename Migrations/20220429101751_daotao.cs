using Microsoft.EntityFrameworkCore.Migrations;

namespace Rws.Migrations
{
    public partial class daotao : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DaoTaoId",
                table: "TblGiangViens",
                nullable: true);

            migrationBuilder.AddColumn<byte>(
                name: "KetQuaThiDua",
                table: "TblGiangViens",
                nullable: true);

            migrationBuilder.AddColumn<byte>(
                name: "KhenThuong",
                table: "TblGiangViens",
                nullable: true);

            migrationBuilder.AddColumn<byte>(
                name: "KieuGV",
                table: "TblGiangViens",
                nullable: true);

            migrationBuilder.AddColumn<byte>(
                name: "LoaiGiangVien",
                table: "TblGiangViens",
                nullable: true);

            migrationBuilder.AddColumn<byte>(
                name: "LoaiVienChuc",
                table: "TblGiangViens",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TblDaoTaos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenKhoa = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TblDaoTaos", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TblGiangViens_DaoTaoId",
                table: "TblGiangViens",
                column: "DaoTaoId");

            migrationBuilder.AddForeignKey(
                name: "FK_TblGiangViens_TblDaoTaos_DaoTaoId",
                table: "TblGiangViens",
                column: "DaoTaoId",
                principalTable: "TblDaoTaos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TblGiangViens_TblDaoTaos_DaoTaoId",
                table: "TblGiangViens");

            migrationBuilder.DropTable(
                name: "TblDaoTaos");

            migrationBuilder.DropIndex(
                name: "IX_TblGiangViens_DaoTaoId",
                table: "TblGiangViens");

            migrationBuilder.DropColumn(
                name: "DaoTaoId",
                table: "TblGiangViens");

            migrationBuilder.DropColumn(
                name: "KetQuaThiDua",
                table: "TblGiangViens");

            migrationBuilder.DropColumn(
                name: "KhenThuong",
                table: "TblGiangViens");

            migrationBuilder.DropColumn(
                name: "KieuGV",
                table: "TblGiangViens");

            migrationBuilder.DropColumn(
                name: "LoaiGiangVien",
                table: "TblGiangViens");

            migrationBuilder.DropColumn(
                name: "LoaiVienChuc",
                table: "TblGiangViens");
        }
    }
}
