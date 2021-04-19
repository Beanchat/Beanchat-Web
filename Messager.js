var messages = document.getElementById("messages");

var msgInput = document.getElementById("msgInput");

var url = "https://api.isaacthoman.me/api/App";

function Messages(msg, add) {
	if (!!msg){
		if(!add){
			messages.innerHTML = msg;
		}else{ 
			messages.innerHTML += msg;
		}
	}
	return messages.innerHTML;
}

async function Send() {
	var msg = msgInput.value;
	if (msg === "") return;
	msgInput.value = "";
	try{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				Refresh();
			}
		};
		xhttp.open("POST", `${url}?message=${msg}`, true);
		xhttp.send();
	}catch(e){Messages(`HTTPS-ERROR ${e}`);}
}

document.getElementById("send").onclick = function () {
	Send();
};

async function Refresh() {
	try{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				var response = this.responseText;
				response = response.replaceAll('@newline', '<br>');
				messages.innerHTML = response.replaceAll('"', '');
			}
		};
		xhttp.open("GET", url, true);
		xhttp.send();
	}catch(e){Messages(`HTTPS-ERROR ${e}`, true);}
}

setInterval(function () {
	Refresh();
	var interval = document.getElementById("intervalInput").value;
	if(interval!=="")RefreshInterval = interval;
	
}, RefreshInterval);

document.getElementById("refresh").onclick = function () {
	Refresh();
};
