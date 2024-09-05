const form = document.getElementById("write-form");
const upload = document.getElementById("image");
const time = document.querySelector(".header_status-time");

function addtime() {
  const curTime = new Date();
  const hour = curTime.getHours().toString();
  const minute = curTime.getMinutes().toString();
  time.innerText = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
}

async function handleSubmitForm(event) {
  event.preventDefault();

  const token = window.localStorage.getItem("token");
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  const user = JSON.parse(jsonPayload).sub;

  const body = new FormData(form);
  body.append("user_id", user.id);
  body.append("atime", new Date().getTime());
  body.append("like_cnt", 0);
  body.append("comment_cnt", 0);
  body.append("tag_id", 0); //<------- 개선 필요

  try {
    const res = await fetch("/items", {
      method: "POST",
      body,
    });
    const data = await res.json();
    if (data === "200") window.location.pathname = "/";
  } catch (e) {
    console.error("에러가 발생했습니다.");
  }
}

function createElement(e, file) {
  const img = document.createElement("img");
  img.setAttribute("src", e.target.result);
  img.setAttribute("data-file", file.name);
  img.style.width = "80vw";
  img.style.height = "20vh";
  img.style.objectFit = "cover";
  return img;
}

function getImageFiles(event) {
  const file = event.currentTarget.files[0];
  const img_Preview = document.querySelector(".preview-img");

  const reader = new FileReader();
  reader.onload = (e) => {
    const preview = createElement(e, file);
    img_Preview.innerHTML = "";
    img_Preview.appendChild(preview);
  };
  reader.readAsDataURL(file);
}

addtime();
setInterval(addtime, 1000);
form.addEventListener("submit", handleSubmitForm);
upload.addEventListener("change", getImageFiles);
