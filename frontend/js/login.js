const time = document.querySelector(".header_status-time");
const notification = document.querySelector(".complete_signup");
const form = document.getElementById("login_form");

function addtime() {
  const curTime = new Date();
  const hour = curTime.getHours().toString();
  const minute = curTime.getMinutes().toString();
  time.innerText = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
}

const showNotification = (text, time) => {
  notification.innerText = text;
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, time);
};

async function handleLoginForm(event) {
  event.preventDefault();
  const body = new FormData(form);
  const sha256PW = sha256(body.get("password"));
  body.set("password", sha256PW);

  const res = await fetch("/login", {
    method: "POST",
    body,
  });

  if (res.status === 200) {
    const data = await res.json();
    const accessToken = data.access_token;
    window.localStorage.setItem("token", accessToken);
    window.sessionStorage.setItem("login", true);
    window.location.pathname = "/";
  } else if (res.status === 401) {
    showNotification("Incorrect!", 1000);
  }
}

const chksignup = () => {
  const chk = window.sessionStorage.getItem("signup");
  if (chk) {
    showNotification("Success!", 2000);
    window.sessionStorage.removeItem("signup");
  }
};

setTimeout(chksignup, 500);
addtime();
setInterval(addtime, 1000);

form.addEventListener("submit", handleLoginForm);
