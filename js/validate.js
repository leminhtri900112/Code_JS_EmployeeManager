const id = (id) => document.getElementById(id);
const ma = id("maNV");
const ten = id("tenNV");
const email = id("emailNV");
const password = id("passwordNV");
const date = id("dateNV");
const chucVu = id("chucVuNV");
// console.log(form);vU

const setError = (element, message) => {
  const itemControl = element.parentElement.parentElement;
  const itemErr = itemControl.querySelector(".error");
  itemErr.innerHTML = message;
  element.focus();
  element.style.border = "1px solid #ff3860";
};

const setSuccess = (element) => {
  const itemControl = element.parentElement.parentElement;
  const itemErr = itemControl.querySelector(".error");
  itemErr.innerHTML = "";
  element.style.border = "1px solid #09c372";
};

const checkEmail = (email) => {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(regexEmail);
};

const vadidation = () => {
  const valueMa = ma.value.trim();
  const valueTen = ten.value.trim();
  const valueEmail = email.value.trim();
  const valuePassword = password.value.trim();
  const valueDate = date.value.trim();
  const valueChucVu = chucVu.selectedIndex;
  var kq = true;
  // console.log(valuePassword);
  // console.log(valuePassword2);
  if (valueMa === "") {
    setError(ma, "Hay nhap gia tri");
    kq = false;
  } else {
    setSuccess(ma);
  }
  if (valueTen === "") {
    setError(ten, "Hay nhap gia tri");
    kq = false;
  } else {
    setSuccess(ten);
  }
  if (valueEmail === "") {
    setError(email, "Hay nhap gia tri");
    kq = false;
  } else if (!checkEmail(valueEmail)) {
    setError(email, "Day khong phai la email");
    kq = false;
  } else {
    setSuccess(email);
  }
  if (valuePassword === "") {
    setError(password, "Hay nhap gia tri");
    kq = false;
  } else {
    setSuccess(password);
  }
  if (valueDate === "") {
    setError(date, "Hay nhap gia tri");
    kq = false;
  } else {
    setSuccess(date);
  }
  if (valueChucVu === 0) {
    setError(chucVu, "Hay nhap gia tri");
    kq = false;
  } else {
    setSuccess(chucVu);
  }
  return kq;
};
