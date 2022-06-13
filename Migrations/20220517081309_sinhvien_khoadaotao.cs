using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Rws.Migrations
{
    public partial class sinhvien_khoadaotao : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte>(
                name: "Canbo",
                table: "TblGiangViens",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "KhoaDaoTaos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenKhoa = table.Column<string>(nullable: true),
                    NgayTao = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhoaDaoTaos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SinhViens",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenSinhVien = table.Column<string>(nullable: true),
                    GioiTinh = table.Column<string>(nullable: true),
                    BienChe = table.Column<bool>(nullable: false),
                    ChucVu = table.Column<string>(nullable: true),
                    TrinhDo = table.Column<byte>(nullable: true),
                    NuocNgoai = table.Column<bool>(nullable: false),
                    NamHoc = table.Column<DateTime>(nullable: false),
                    NgaySinh = table.Column<DateTime>(nullable: false),
                    NgayTao = table.Column<DateTime>(nullable: false),
                    GhiChu = table.Column<string>(nullable: true),
                    KhenThuong = table.Column<byte>(nullable: true),
                    KetQuaThiDua = table.Column<byte>(nullable: true),
                    DaoTaoId = table.Column<int>(nullable: true),
                    DonViId = table.Column<int>(nullable: true),
                    ChuyenMonId = table.Column<int>(nullable: true),
                    NghiepVuId = table.Column<int>(nullable: true),
                    KhoaDaoTaoId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SinhViens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SinhViens_TblChuyenMons_ChuyenMonId",
                        column: x => x.ChuyenMonId,
                        principalTable: "TblChuyenMons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SinhViens_TblDaoTaos_DaoTaoId",
                        column: x => x.DaoTaoId,
                        principalTable: "TblDaoTaos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SinhViens_TblDonVis_DonViId",
                        column: x => x.DonViId,
                        principalTable: "TblDonVis",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SinhViens_KhoaDaoTaos_KhoaDaoTaoId",
                        column: x => x.KhoaDaoTaoId,
                        principalTable: "KhoaDaoTaos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SinhViens_TblNghiepVus_NghiepVuId",
                        column: x => x.NghiepVuId,
                        principalTable: "TblNghiepVus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SinhViens_ChuyenMonId",
                table: "SinhViens",
                column: "ChuyenMonId");

            migrationBuilder.CreateIndex(
                name: "IX_SinhViens_DaoTaoId",
                table: "SinhViens",
                column: "DaoTaoId");

            migrationBuilder.CreateIndex(
                name: "IX_SinhViens_DonViId",
                table: "SinhViens",
                column: "DonViId");

            migrationBuilder.CreateIndex(
                name: "IX_SinhViens_KhoaDaoTaoId",
                table: "SinhViens",
                column: "KhoaDaoTaoId");

            migrationBuilder.CreateIndex(
                name: "IX_SinhViens_NghiepVuId",
                table: "SinhViens",
                column: "NghiepVuId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SinhViens");

            migrationBuilder.DropTable(
                name: "KhoaDaoTaos");

            migrationBuilder.DropColumn(
                name: "Canbo",
                table: "TblGiangViens");
        }
    }
}
