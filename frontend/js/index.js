const time = document.querySelector(".header_status-time");

function addtime() {
  const curTime = new Date();
  const hour = curTime.getHours().toString();
  const minute = curTime.getMinutes().toString();
  time.innerText = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
}

const calTime = (timestamp) => {
  const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
  const time = new Date(curTime - timestamp);
  const day = time.getDay();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  if (day) return `${day} Days ago`;
  else if (hour) return `${hour} Hours ago`;
  else if (minute) return `${minute} Minutes ago`;
  else return `${second} Seconds ago`;
};

const renderData = (data) => {
  const main = document.querySelector("main");
  data.reverse().forEach(async (obj) => {
    const main_box_move1 = document.createElement("a");
    main_box_move1.className = main_box_move1;
    main_box_move1.style.textDecoration = "none";
    main_box_move1.style.color = "black";
    main_box_move1.href = `/detail.html?${obj.id}`;

    const main_box_move2 = document.createElement("a");
    main_box_move2.className = main_box_move2;
    main_box_move2.style.textDecoration = "none";
    main_box_move2.style.color = "black";
    main_box_move2.href = `/detail.html?${obj.id}`;

    const main_box = document.createElement("div");
    main_box.className = "main_box";

    const main_box_L = document.createElement("div");
    main_box_L.className = "main_box-L";

    const main_box_user = document.createElement("div");
    main_box_user.className = " main_box-user";

    const main_box_user_img = document.createElement("div");
    main_box_user_img.className = "main_box-user-img";

    const user_img = document.createElement("img");
    user_img.src = "assets/my.svg"; // <--------------- 개선 필요

    const main_box_user_name = document.createElement("div");
    main_box_user_name.className = "main_box-user-name";
    main_box_user_name.innerText = "Name"; //<--------- 개선 필요

    const main_box_img = document.createElement("div");
    main_box_img.className = "main_box-img";

    const write_img = document.createElement("img");
    const res = await fetch(`/images/${obj.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    write_img.src = url;
    URL.revokeObjectURL(url);

    const main_box_R = document.createElement("div");
    main_box_R.className = "main_box-R";

    const main_box_time = document.createElement("div");
    main_box_time.className = "main_box-time";

    const main_box_time_div = document.createElement("div");
    main_box_time_div.innerText = `${calTime(obj.atime)}`;

    const main_box_title = document.createElement("div");
    main_box_title.className = "main_box-title";
    main_box_title.innerText = obj.title;

    const main_box_detail = document.createElement("div");
    main_box_detail.className = "main_box-detail";
    let str = obj.detail;
    if (obj.detail.length >= 30) str = str.substr(0, 30) + "...";
    main_box_detail.innerText = str;

    const main_box_react = document.createElement("div");
    main_box_react.className = "main_box-react";

    const main_box_like = document.createElement("div");
    main_box_like.className = "main_box-like";

    const main_box_like_img = document.createElement("div");
    main_box_like_img.className = "main_box-like-img";

    const like_img = document.createElement("img");
    like_img.src = "assets/love_1.svg";

    const main_box_like_cnt = document.createElement("div");
    main_box_like_cnt.className = "main_box-like-cnt";
    main_box_like_cnt.innerText = obj.like_cnt;

    const main_box_comment = document.createElement("div");
    main_box_comment.className = "main_box-comment";

    const main_box_comment_img = document.createElement("div");
    main_box_comment_img.className = "main_box-comment-img";

    const comment_img = document.createElement("img");
    comment_img.src = "assets/comment.svg";

    const main_box_comment_cnt = document.createElement("div");
    main_box_comment_cnt.className = "main_box-comment-cnt";
    main_box_comment_cnt.innerText = obj.comment_cnt;

    // L
    main_box_user_img.appendChild(user_img);

    main_box_user.appendChild(main_box_user_img);
    main_box_user.appendChild(main_box_user_name);

    main_box_img.appendChild(write_img);

    main_box_L.appendChild(main_box_user);
    main_box_L.appendChild(main_box_img);

    //R
    main_box_time.appendChild(main_box_time_div);

    main_box_like_img.appendChild(like_img);

    main_box_like.appendChild(main_box_like_img);
    main_box_like.appendChild(main_box_like_cnt);

    main_box_comment_img.appendChild(comment_img);

    main_box_comment.appendChild(main_box_comment_img);
    main_box_comment.appendChild(main_box_comment_cnt);

    main_box_react.appendChild(main_box_like);
    main_box_react.appendChild(main_box_comment);

    main_box_move2.appendChild(main_box_time);
    main_box_move2.appendChild(main_box_title);
    main_box_move2.appendChild(main_box_detail);

    main_box_R.appendChild(main_box_move2);
    main_box_R.appendChild(main_box_react);

    //Main
    main_box_move1.appendChild(main_box_L);

    main_box.appendChild(main_box_move1);
    main_box.appendChild(main_box_R);

    main.appendChild(main_box);
  });
};

async function fetchList() {
  const res = await fetch("/items");
  const data = await res.json();
  renderData(data);
}

function likehandlechange() {
  const like_img = document.querySelector(".main_box-like-img");
  const like_cnt = document.querySelector(".main_box-like-cnt");
  let cnt = parseInt(like_cnt.innerText);
  if (like_img.innerHTML === '<img src="assets/love_1.svg">') {
    like_img.innerHTML = '<img src="assets/love_2.svg">';
    cnt++;
  } else {
    like_img.innerHTML = '<img src="assets/love_1.svg">';
    cnt--;
  }

  like_cnt.innerText = cnt;
}

function likehandle() {
  const like = document.querySelector(".main_box-like");
  like.addEventListener("click", likehandlechange);
}

fetchList();
addtime();
setInterval(addtime, 1000);
setTimeout(likehandle, 100);
