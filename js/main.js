// Popup modal

function modal(type) {
  // 1: Form Login, 2: Form Update
  document.getElementById("formNV").reset();
  switch (type) {
    case 1:
      document.getElementById("title").innerHTML = "Login";
      document.getElementById("btnUpdate").style.display = "none";
      document.getElementById("btnAdd").style.display = "block";
      document.getElementById("maNV").readOnly = false;
      break;
    case 2:
      document.getElementById("title").innerHTML = "Update";
      document.getElementById("btnUpdate").style.display = "block";
      document.getElementById("btnAdd").style.display = "none";
      document.getElementById("maNV").readOnly = true;
      break;
    default:
      break;
  }
}

var dsnv = [];

var dsnvJson = localStorage.getItem("dsnvLocal");
// if (dssvJson !== null) {
if (dsnvJson) {
  console.log(dsnvJson);
  var dsnvLocal = JSON.parse(dsnvJson);
  console.dsnvLocal;
  dsnv = dsnvLocal.map(function (nv) {
    return new NhanVien(
      nv.maNV,
      nv.tenNV,
      nv.mail,
      nv.matKhau,
      nv.date,
      nv.chucVu
    );
  });

  renderTable(dsnv);
}

function luuDataLocal() {
  var dsnvJson = JSON.stringify(dsnv);
  localStorage.setItem("dsnvLocal", dsnvJson);
}

function clearForm() {
  var itemErr = document.querySelectorAll(".error");
  var inputModal = document.querySelectorAll(".inputModal");
  // console.log(itemErr);
  Array.from(itemErr).map(function (ele) {
    ele.innerHTML = "";
  });
  Array.from(inputModal).map(function (ele) {
    ele.style.border = "1px solid #ced4da";
  });
}

function themNV() {
  var ma = document.getElementById("maNV").value;
  var ten = document.getElementById("tenNV").value;
  var email = document.getElementById("emailNV").value;
  var matKhau = document.getElementById("passwordNV").value;
  var date = document.getElementById("dateNV").value;
  var chucVu = document.getElementById("chucVuNV").value;

  var nhanVien = new NhanVien(ma, ten, email, matKhau, date, chucVu);
  console.log("sinhVien", nhanVien);
  var isValid = vadidation();

  if (isValid) {
    dsnv.push(nhanVien);
    renderTable(dsnv);
    luuDataLocal();
    // document.getElementById("formNV").reset();
    console.log(dsnv);
  }
}
function timKiemNV(maNV) {
  for (var index = 0; index < dsnv.length; index++) {
    if (dsnv[index].maNV * 1 === maNV * 1) {
      return index;
    }
  }
}

function xoaNV(maNV) {
  var index = timKiemNV(maNV);
  // console.log(index);
  dsnv.splice(index, 1);
  renderTable(dsnv);
  luuDataLocal();
}

function suaNV(maNV) {
  modal(2);
  console.log(maNV);
  var index = timKiemNV(maNV);
  var nv = dsnv[index];

  document.getElementById("maNV").value = nv.maNV;
  document.getElementById("tenNV").value = nv.tenNV;
  document.getElementById("emailNV").value = nv.mail;
  document.getElementById("passwordNV").value = nv.matKhau;
  document.getElementById("dateNV").value = nv.date;
  // console.log(nv.chucVu);
  document.getElementById("chucVuNV").selectedIndex = nv.chucVu;
}

function capNhatNV() {
  var ma = document.getElementById("maNV").value;
  var ten = document.getElementById("tenNV").value;
  var email = document.getElementById("emailNV").value;
  var matKhau = document.getElementById("passwordNV").value;
  var date = document.getElementById("dateNV").value;
  var chucVu = document.getElementById("chucVuNV").value;

  var nhanVien = new NhanVien(ma, ten, email, matKhau, date, chucVu);
  var isValid = vadidation();
  if (isValid) {
    var index = timKiemNV(ma);
    dsnv[index] = nhanVien;
    renderTable(dsnv);
    document.getElementById("formNV").reset();
  }
  // console.log("yes");
}

function timNhanVienTheoTen() {
  var ten = document.getElementById("searchNV").value.trim().toUpperCase();
  let dskq = [];

  for (const item of dsnv) {
    let tenNV = item.tenNV.trim().toUpperCase();
    if (tenNV.search(ten) !== -1) {
      dskq.push(item);
    }
  }
  renderTable(dskq);
}
function renderTable(array) {
  var contentHTML = "";
  for (var index = 0; index < array.length; index++) {
    var nv = array[index];
    contentHTML += `
    <tr> 
         <td>${nv.maNV}</td>
         <td>${nv.tenNV}</td>
         <td>${nv.mail}</td>
         <td>${nv.matKhau}</td>
         <td>${nv.date}</td>
         <td>${nv.chucVu}</td>
         <td>
         <button class="btn btn-success m-1" onclick="suaNV(${nv.maNV})"  data-toggle="modal"
         data-target="#exampleModalCenter">Sửa</button>
         <button class="btn btn-danger"  onclick="xoaNV(${nv.maNV})">Xoá</button>
         </td>
    </tr>`;
  }
  document.getElementById("tbodyNhanvien").innerHTML = contentHTML;
  //   console.log(contentHTML);
}
