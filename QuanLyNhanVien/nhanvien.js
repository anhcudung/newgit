function NhanVien(
  taikhoan,
  ten,
  email,
  matkhau,
  ngaylam,
  luongcoban,
  chucvu,
  giolam
) {
  this.taikhoan = taikhoan;
  this.ten = ten;
  this.email = email;
  this.matkhau = matkhau;
  this.ngaylam = ngaylam;
  this.luongcoban = luongcoban;
  this.chucvu = chucvu;
  this.giolam = giolam;
  this.total = 0;
  this.xeploai = "";       

  this.tongluong = function () {
    
    if (this.chucvu === "Sếp") {
      this.total = parseFloat(this.luongcoban) * 3;
    } else if (this.chucvu === "Trưởng phòng") {
      this.total = parseFloat(this.luongcoban) * 2;
    } else if (this.chucvu === "Nhân viên") {
      this.total = parseFloat(this.luongcoban);
    }
    return this.total;
  };
  this.xepLoaiNV = function () {
    if (this.chucvu === "Nhân viên") {
      if (parseFloat(this.giolam) >= 192) {
        this.xeploai = "Xuất sắc";
      } else if (parseFloat(this.giolam) >= 176) {
        this.xeploai = "Giỏi";
      } else if (parseFloat(this.giolam) >= 160) {
        this.xeploai = "Khá";
      } else {
        this.xeploai = "Trung bình";
      }
    }
    return this.xeploai;
  };
}
