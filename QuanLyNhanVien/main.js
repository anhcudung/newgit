var dsnv = new DanhSachSinhVien();
var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

getLocalStorage();

//lấy thông tin đầu vào
function layThongTinDauVao(isAdd) {
  var taikhoan = getEle("tknv").value;
  var ten = getEle("name").value;
  var email = getEle("email").value;
  var matkhau = getEle("password").value;
  var ngaylam = getEle("datepicker").value;
  var luongcoban = getEle("luongCB").value;
  var chucvu = getEle("chucvu").value;
  var giolam = getEle("gioLam").value;
  // console.log(chucvu);

  var isValid = true;
  if(isAdd){
    isValid &=
    validation.kiemTraRong(taikhoan, "tbTKNV", "không được để trống") &&
    validation.kiemTraDoDaiKyTu(
      taikhoan,
      "tbTKNV",
      "tài khoản có 4 tới 6 kí tự",
      4,
      6
    ) &&
    validation.kiemTraMaTrung(taikhoan, "tbTKNV", "mã đã tồn tại", dsnv.list);
  }
  isValid &=
    validation.kiemTraRong(ten, "tbTen", "không được để trống") &&
    validation.kiemTraKyTuChuoi(ten, "tbTen", "vui lòng nhập chữ");

  isValid &=
    validation.kiemTraRong(email, "tbEmail", " không được để rỗng") &&
    validation.kiemTraEmail(
      email,
      "tbEmail",
      "vui lòng nhập đúng định dạng email"
    );

  isValid &=
    validation.kiemTraRong(matkhau, "tbMatKhau", "không được để rỗng") &&
    validation.kiemTraMatkhau(
      matkhau,
      "tbMatKhau",
      "vui lòng nhập đúng định dạng mật khẩu"
    ) &&
    validation.kiemTraDoDaiKyTu(
      matkhau,
      "tbMatKhau",
      "độ dài kí tự từ 6 đến 10",
      6,
      10
    );

  isValid &=
    validation.kiemTraRong(ngaylam, "tbNgay", "vui lòng chọn ngày làm") &&
    validation.kiemTraNgayLam(
      ngaylam,
      "tbNgay",
      "ngày sinh không đúng định dạng"
    );

  isValid &=
    validation.kiemTraRong(luongcoban, "tbLuongCB", "không được để rỗng") &&
    validation.kiemTraGiaTri(
      luongcoban,
      "tbLuongCB",
      "mức lương từ 1 triệu đến 20 triệu",
      1000000,
      20000000
    ) &&
    validation.kiemTraSo(luongcoban, "tbLuongCB", "vui lòng nhập số");
  isValid &= validation.kiemTraChucVu(
    "chucvu",
    "tbChucVu",
    "chọn đúng chức vụ"
  );
  isValid &=
    validation.kiemTraRong(giolam, "tbGiolam", "không được để rỗng") &&
    validation.kiemTraGiaTri(
      giolam,
      "tbGiolam",
      " nhập giờ làm từ 80 dến 200",
      80,
      200
    ) &&
    validation.kiemTraSo(giolam, "tbGiolam", "vui lòng nhập số");
  if (isValid) {
    var nhanvien = new NhanVien(
      taikhoan,
      ten,
      email,
      matkhau,
      ngaylam,
      luongcoban,
      chucvu,
      giolam
    );
    return nhanvien;
  }
  return null;
}
getEle("btnThemNV").addEventListener("click", function () {
  var nhanvien = layThongTinDauVao(true);
  if (nhanvien) {
    nhanvien.tongluong();
    nhanvien.xepLoaiNV();
    dsnv.themNV(nhanvien);
    taoBang(dsnv.list);
    setLocalStorage();
  }
});
function taoBang(arr) {
  getEle("tableDanhSach").innerHTML = "";
  for (var i = 0; i < arr.length; i++) {
    var tagTR = document.createElement("tr");
    var tagTD_taikhoan = document.createElement("td");
    var tagTD_ten = document.createElement("td");
    var tagTD_email = document.createElement("td");
    var tagTD_matkhau = document.createElement("td");
    var tagTD_ngaylam = document.createElement("td");
    var tagTD_luongcoban = document.createElement("td");
    var tagTD_chucvu = document.createElement("td");
    var tagTD_giolam = document.createElement("td");
    var tagTD_tongluong = document.createElement("td");
    var tagTD_xeploai = document.createElement("td");
    var tagTD_Button_Edit = document.createElement("td");
    var tagTD_Button_Delete = document.createElement("td");

    tagTD_taikhoan.innerHTML = arr[i].taikhoan;
    tagTD_ten.innerHTML = arr[i].ten;
    tagTD_email.innerHTML = arr[i].email;
    tagTD_matkhau.innerHTML = arr[i].matkhau;
    tagTD_ngaylam.innerHTML = arr[i].ngaylam;
    tagTD_luongcoban.innerHTML = arr[i].luongcoban;
    tagTD_chucvu.innerHTML = arr[i].chucvu;
    tagTD_giolam.innerHTML = arr[i].giolam;
    tagTD_tongluong.innerHTML = arr[i].total;
    tagTD_xeploai.innerHTML = arr[i].xeploai;
    tagTD_Button_Edit.innerHTML =
      '<button class="btn btn-info" data-toggle="modal" data-target="#myModal"  onclick="suaNhanVien(\'' +
      arr[i].taikhoan +
      "')\">Sửa</button>";
    tagTD_Button_Delete.innerHTML =
      '<button class="btn btn-danger" onclick="xoaNhanVien(\'' +
      arr[i].taikhoan +
      "')\">Xóa</button>";

    tagTR.appendChild(tagTD_taikhoan);
    tagTR.appendChild(tagTD_ten);
    tagTR.appendChild(tagTD_email);
    tagTR.appendChild(tagTD_matkhau);
    tagTR.appendChild(tagTD_ngaylam);
    tagTR.appendChild(tagTD_luongcoban);
    tagTR.appendChild(tagTD_chucvu);
    tagTR.appendChild(tagTD_giolam);
    tagTR.appendChild(tagTD_tongluong);
    tagTR.appendChild(tagTD_xeploai);
    tagTR.appendChild(tagTD_Button_Edit);
    tagTR.appendChild(tagTD_Button_Delete);

    getEle("tableDanhSach").appendChild(tagTR);
  }
}

//xóa nhân viên
function xoaNhanVien(taikhoan) {
  dsnv.xoaNhanVien(taikhoan);
  taoBang(dsnv.list);
  setLocalStorage();
}

// sửa nhân viên
function suaNhanVien(taikhoan) {
  // getEle("myModal").style.display="block";
  var nhanvien = dsnv.layTTNhanVien(taikhoan);
  getEle("tknv").value = nhanvien.taikhoan;
  getEle("tknv").disabled = true;
  getEle("name").value = nhanvien.ten;
  getEle("email").value = nhanvien.email;
  getEle("password").value = nhanvien.matkhau;
  getEle("datepicker").value = nhanvien.ngaylam;
  getEle("luongCB").value = nhanvien.luongcoban;
  getEle("chucvu").value = nhanvien.chucvu;
  getEle("gioLam").value = nhanvien.giolam;
  
}
//cập nhập lại nhân viên.
getEle("btnCapNhat").addEventListener("click", function () {
  var nhanvien = layThongTinDauVao(false);
  // console.log(nhanvien);
  nhanvien.tongluong();
  nhanvien.xepLoaiNV();
  dsnv.capNhatNV(nhanvien);
  taoBang(dsnv.list);
  setLocalStorage();
});

//tìm kiếm theo chức vụ
getEle("searchName").addEventListener("keyup", function () {
  var keyWord = getEle("searchName").value;
  var mangTimKiem = dsnv.timKiemNhanVien(keyWord);
  taoBang(mangTimKiem);
});

//LocalStorage
function setLocalStorage() {
  var arrString = JSON.stringify(dsnv.list);
  localStorage.setItem("DSNV", arrString);
}
function getLocalStorage() {
  if (localStorage.getItem("DSNV")) {
    var data = localStorage.getItem("DSNV");
    dsnv.list = JSON.parse(data);
    taoBang(dsnv.list);
  }
}
