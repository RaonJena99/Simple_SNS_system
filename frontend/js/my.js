const time = document.querySelector(".header_status-time");

function addtime() {
  const curTime = new Date();
  const hour = curTime.getHours().toString();
  const minute = curTime.getMinutes().toString();
  time.innerText = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
}

const calTime = (timestamp) => {
  const TIME_ZONE = 3240 * 10000 - 9 * 60 * 60 * 1000;
  const start = new Date(timestamp);
  const end = new Date(new Date().getTime() + TIME_ZONE);
  const diff = (end - start) / 1000;
};

const Movepage = async () => {
  if (window.location.pathname === "/my.html") {
    const my = document.querySelector(".footer-box[data-idx='2']");
    my.style.cssText =
      "-webkit-filter: brightness(0) invert(1); filter: brightness(0) invert(1);";
  }
};

Movepage();
addtime();
setInterval(addtime, 1000);
