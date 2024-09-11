const time = document.querySelector(".header_status-time");
const more = document.querySelector(".header-more");
const del = document.querySelector(".more_log");
const com_img = document.getElementById("com_img");
const comment = document.getElementById("comment_form");

function addtime() {
  const curTime = new Date();
  const hour = curTime.getHours().toString();
  const minute = curTime.getMinutes().toString();
  time.innerText = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
}

const renderComment = async (data) => {
  const comment_box = document.querySelector(".comment_box");
  let comment_cnt = document.querySelector(".comment_box-cnt");
  comment_cnt.innerText = data.length;

  const sortdata = data.sort((a, b) => a.atime - b.atime);
  for (const obj of sortdata) {
    const comment_box_main = document.createElement("div");
    comment_box_main.className = "comment_box-main";

    const comment_box_img = document.createElement("div");
    comment_box_img.className = "comment_box-img";

    const comment_img = document.createElement("img");

    const comresi = await fetch(`/user_img/${obj.user_id}`);
    const comblobi = await comresi.blob();
    const comurli = await URL.createObjectURL(comblobi);
    comment_img.src = comurli;
    URL.revokeObjectURL(comurli);

    const comment_box_detail = document.createElement("div");
    comment_box_detail.className = "comment_box-detail";

    const comment_box_detail_top = document.createElement("div");
    comment_box_detail_top.className = "comment_box-detail-top";

    const comment_box_detail_name = document.createElement("div");
    comment_box_detail_name.className = "comment_box-detail-name";
    comment_box_detail_name.innerText = obj.user_nick;

    const comment_box_detail_time = document.createElement("div");
    comment_box_detail_time.className = "comment_box-detail-time";

    const comdate = new Date(obj.atime);
    const commonth = comdate.getMonth() + 1;
    const comday = comdate.getDate();
    const comhour = comdate.getHours();
    const commin = comdate.getMinutes();
    comment_box_detail_time.innerText = `${commonth
      .toString()
      .padStart(2, "0")}.${comday.toString().padStart(2, "0")} ${comhour
      .toString()
      .padStart(2, "0")}:${commin.toString().padStart(2, "0")}`;

    const comment_box_detail_bottom_size = document.createElement("div");
    comment_box_detail_bottom_size.className = "comment_box-detail-bottom-size";

    const comment_box_detail_bottom = document.createElement("div");
    comment_box_detail_bottom.className = "comment_box-detail-bottom";
    comment_box_detail_bottom.innerText = obj.com;

    comment_box_img.appendChild(comment_img);

    comment_box_detail_top.appendChild(comment_box_detail_name);
    comment_box_detail_top.appendChild(comment_box_detail_time);
    comment_box_detail.appendChild(comment_box_detail_top);

    comment_box_detail_bottom_size.appendChild(comment_box_detail_bottom);
    comment_box_detail.appendChild(comment_box_detail_bottom_size);

    comment_box_main.appendChild(comment_box_img);
    comment_box_main.appendChild(comment_box_detail);

    comment_box.appendChild(comment_box_main);
  }
};

const renderData = async (data) => {
  const resu = await fetch(`/users/${data.user_id}`);
  const datau = await resu.json();
  const main = document.querySelector(".detail");

  const detail_main = document.createElement("div");
  detail_main.className = "detail_main";

  const detail_main_user = document.createElement("div");
  detail_main_user.className = "detail_main-user";

  const detail_main_user_img = document.createElement("div");
  detail_main_user_img.className = "detail_main-user-img";

  const user_img = document.createElement("img");

  const resi = await fetch(`/user_img/${datau.id}`);
  const blobi = await resi.blob();
  const urli = URL.createObjectURL(blobi);
  user_img.src = urli;
  com_img.src = urli;
  URL.revokeObjectURL(urli);

  const detail_main_user_name = document.createElement("div");
  detail_main_user_name.className = "detail_main-user-name";
  detail_main_user_name.innerText = datau.nickname;

  const detail_main_user_date = document.createElement("div");
  detail_main_user_date.className = "detail_main_user-date";
  const date = new Date(data.atime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  detail_main_user_date.innerText = `${year}.${month
    .toString()
    .padStart(2, "0")}.${day.toString().padStart(2, "0")}`;

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
  detail_main_user.appendChild(detail_main_user_date);

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
  // 게시글 정보
  const res = await fetch(`/items/${id[1]}`);
  const data = await res.json();
  //댓글 정보
  const comres = await fetch(`/coms/${id[1]}`);
  const comdata = await comres.json();

  if (comdata) renderComment(comdata);
  renderData(data);
}

const handlemore = () => {
  const log = document.querySelector(".more_log");
  if (log.className === "more_log") log.classList.add("show");
  else log.classList.remove("show");
};

const handleDelete = async () => {
  if (confirm("Are you sure you want to delete?")) {
    let qs = window.document.URL.toString();
    let id = qs.split("?");
    const res = await fetch(`/items/${id[1]}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      window.location.pathname = "/";
    }
  }
};

const handleComment = async (event) => {
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
  const qs = window.document.URL.toString();
  const id = qs.split("?");

  const body = new FormData(comment);
  console.log(body);

  body.append("item_id", id[1]);
  body.append("user_id", user.id);
  body.append("user_nick", user.nickname);
  body.append("atime", new Date().getTime());

  try {
    const res = await fetch("/coms", {
      method: "POST",
      body,
    });
    const data = await res.json();
    if (data === "200") window.location.reload();
  } catch (e) {
    console.error("에러가 발생했습니다.");
  }
};

fetchList();
addtime();
setInterval(addtime, 1000);

more.addEventListener("click", handlemore);
del.addEventListener("click", handleDelete);

comment.addEventListener("submit", handleComment);
