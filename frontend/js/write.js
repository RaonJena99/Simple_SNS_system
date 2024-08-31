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

  const body = new FormData(form);
  body.append("user_id", 0); //<-----게선 필요
  body.append("atime", new Date().getTime());
  body.append("like_cnt", 0);
  body.append("comment_cnt", 0);
  body.append("tag_id", 0); //<------- 개선 필요
  console.log(body);

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
