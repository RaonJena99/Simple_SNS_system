const form = document.getElementById("signup_form");
const time = document.querySelector(".header_status-time");
const id = document.getElementById("id");
const pwd = document.getElementById("password");
const id_chk = document.querySelector(".id_chk");
const pwd_chk = document.querySelector(".pwd_chk");
let id_chk2 = false;
let pwd_chk2 = false;

function addtime() {
  const curTime = new Date();
  const hour = curTime.getHours().toString();
  const minute = curTime.getMinutes().toString();
  time.innerText = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
}

async function handleLoginForm(event) {
  event.preventDefault();
  const body = new FormData(form);
  const sha256PW = sha256(body.get("password"));
  body.set("password", sha256PW);

  if (checkPassword()) {
    const res = await fetch("/signup", {
      method: "POST",
      body,
    });
    const data = await res.json();
    if (data === "200") {
      alert("회원가입에 성공했습니다.");
      window.location.pathname = "/login.html";
    }
  } else {
    alert("비밀번호가 같지 않습니다.");
  }
}

const handleid = async (e) => {
  let str = e.target.value;
  var chkStyle = /^[a-z0-9_-]{4,12}$/;
  if (chkStyle.test(str)) {
    id.style.borderImage =
      "linear-gradient(to right, green 0%, rgb(245, 245, 245) 100%)";
    id.style.borderImageSlice = "1";
    id_chk.innerText = "Available";
    id_chk.style.color = "green";
    id_chk2 = true;
  } else {
    id.style.borderImage =
      "linear-gradient(to right, red 0%, rgb(245, 245, 245) 100%)";
    id.style.borderImageSlice = "1";
    id_chk.innerText = "Only use 4 ~ 12 lower-case";
    id_chk.style.color = "red";
    id_chk2 = false;
  }
};

const handlepwd = async (e) => {
  let len = e.target.value.length;
  let str = e.target.value;
  var chkStyle = /[0-9]/;

  if (len < 6) {
    pwd.style.borderImage =
      "linear-gradient(to right, red 0%, rgb(245, 245, 245) 100%)";
    pwd.style.borderImageSlice = "1";
    pwd_chk.innerText = "Must be at least 6 characters long";
    pwd_chk.style.color = "red";
    pwd_chk2 = false;
  } else {
    if (
      str !== str.toLowerCase() &&
      str !== str.toUpperCase() &&
      chkStyle.test(str)
    ) {
      pwd.style.borderImage =
        "linear-gradient(to right, green 0%, rgb(245, 245, 245) 100%)";
      pwd_chk.innerText = "Available";
      pwd.style.borderImageSlice = "1";
      pwd_chk.style.color = "green";
      pwd_chk2 = true;
    } else {
      pwd.style.borderImage =
        "linear-gradient(to right, red 0%, rgb(245, 245, 245) 100%)";
      pwd.style.borderImageSlice = "1";
      pwd_chk.innerText = "Must contain letters in mixed case and numbers";
      pwd_chk.style.color = "red";
      pwd_chk2 = false;
    }
  }
};

addtime();
setInterval(addtime, 1000);

id.addEventListener("input", handleid);
pwd.addEventListener("input", handlepwd);

form.addEventListener("submit", handleLoginForm);
