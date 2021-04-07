var messages = document.getElementById("messages");

var msgInput = document.getElementById("msgInput");

var url = "https://api.beanchat.isaacthoman.me/api/App";

function Messages(msg){
  if(!!msg)messages.innerHTML = msg;
  return messages.innerHTML;
}

async function Send() {
  var msg = msgInput.value;
  if (msg === "") return;
  msgInput.value = "";

  try {
    var response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/html;charset=utf-8"
      },
      message: msg
    });
  } catch (e) {
    this.error = e;
    return;
  }

  if (response.ok) {
    console.log(await response.text());
    Refresh();
  } else {
    Messages(`HTTP-Error: ${response.status}`);
  }
}

document.getElementById("send").onclick = function () {
  Send();
};

async function Refresh() {
  try {
    var response = await fetch(url);
  } catch (e) {

    messages.innerHTML = `HTTP-Error: ${e}`;
    return;
  }
  if (response.ok) {
    Messages(`HTTP-Error: ${await response.text()}`);
  } else {
    Messages(`HTTP-Error: ${response.status}`);
  }
}

document.getElementById("refresh").onclick = function () {
  Refresh();
};
