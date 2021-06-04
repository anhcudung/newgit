function DanhSachSinhVien() {
  this.list = [];
  this.themNV = function (sv) {
    this.list.push(sv);
  };
  this.timViTri = function (taikhoan) {
    var index = -1;
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].taikhoan == taikhoan) {
        index = i;
        break;
      }
    }
    return index;
  };
  this.xoaNhanVien = function (taikhoan) {
    var index = this.timViTri(taikhoan);

    if (index !== -1) {
      this.list.splice(index, 1);
    }
  };
  this.layTTNhanVien = function (taikhoan) {
    var index = this.timViTri(taikhoan);

    if (index !== -1) {
      return this.list[index];
    }
  };

  this.capNhatNV = function (nhanvien) {
    var index = this.timViTri(nhanvien.taikhoan);

    if (index !== -1) {
      this.list[index] = nhanvien;
    }
  };
}
DanhSachSinhVien.prototype.timKiemNhanVien = function (keyword) {
  /**
   * 0. Tạo mangTimKiem = [];
   * 1. Duyệt mảng list
   * 2. Nếu như keyword trùng với sinhVien.tenSV
   *      => Tìm thấy: thêm sinhVien vào mangTimKiem
   * 3. Trả về mangTimKiem
   */
  var mangTimKiem = [];
  for (var i = 0; i < this.list.length; i++) {
      if (
          this.list[i].xeploai.toLowerCase().indexOf(keyword.toLowerCase()) !==
          -1
      ) {
          mangTimKiem.push(this.list[i]);
      }
  }
  return mangTimKiem;
};

