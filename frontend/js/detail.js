const time = document.querySelector(".header_status-time");

function addtime() {
  const curTime = new Date();
  const hour = curTime.getHours().toString();
  const minute = curTime.getMinutes().toString();
  time.innerText = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
}

const renderData = async (data) => {
  const main = document.querySelector(".detail");

  const detail_main = document.createElement("div");
  detail_main.className = "detail_main";

  const detail_main_user = document.createElement("div");
  detail_main_user.className = "detail_main-user";

  const detail_main_user_img = document.createElement("div");
  detail_main_user_img.className = "detail_main-user-img";

  const user_img = document.createElement("img");
  user_img.src = "assets/my.svg"; //<------- 개선 필요

  const detail_main_user_name = document.createElement("div");
  detail_main_user_name.className = "detail_main-user-name";
  detail_main_user_name.innerText = "Name"; //<------- 개선 필요

  const detail_main_img = document.createElement("div");
  detail_main_img.className = "detail_main-img";

  const detail_img = document.createElement("img");
  const res = await fetch(`/images/${data.id}`);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  detail_img.src = url;
  URL.revokeObjectURL(url);

  const detail_main_t_l = document.createElement("div");
  detail_main_t_l.className = "detail_main-t-l";

  const detail_main_title = document.createElement("div");
  detail_main_title.className = "detail_main-title";

  const title_img = document.createElement("img");
  title_img.src = "assets/downarrow.svg";

  const title = document.createElement("div");
  title.innerText = data.title;

  const detail_main_like = document.createElement("div");
  detail_main_like.className = "detail_main-like";

  const detail_main_like_img = document.createElement("div");
  detail_main_like_img.className = "detail_main-like-img";

  const like_img = document.createElement("img");
  like_img.src = "assets/love_1.svg";

  const detail_main_like_cnt = document.createElement("div");
  detail_main_like_cnt.className = "detail_main-like-cnt";
  detail_main_like_cnt.innerText = data.like_cnt;

  const detail_main_detail = document.createElement("div");
  detail_main_detail.className = "detail_main-detail";
  detail_main_detail.innerText = data.detail;

  detail_main_user_img.appendChild(user_img);

  detail_main_user.appendChild(detail_main_user_img);
  detail_main_user.appendChild(detail_main_user_name);

  detail_main_img.appendChild(detail_img);

  detail_main_title.appendChild(title_img);
  detail_main_title.appendChild(title);

  detail_main_t_l.appendChild(detail_main_title);

  detail_main_like_img.appendChild(like_img);

  detail_main_like.appendChild(detail_main_like_img);
  detail_main_like.appendChild(detail_main_like_cnt);

  detail_main_t_l.appendChild(detail_main_like);

  detail_main.appendChild(detail_main_user);
  detail_main.appendChild(detail_main_img);
  detail_main.appendChild(detail_main_t_l);
  detail_main.appendChild(detail_main_detail);

  main.appendChild(detail_main);
};

async function fetchList() {
  let qs = window.document.URL.toString();
  let id = qs.split("?");
  const res = await fetch(`/items/${id[1]}`);
  const data = await res.json();
  renderData(data);
}

fetchList();
addtime();
setInterval(addtime, 1000);
