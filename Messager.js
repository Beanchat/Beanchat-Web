var messages = document.getElementById("messages");

var msgInput = document.getElementById("msgInput");

var debug = document.getElementById("debug");

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

async function Request(action, url, callback){
	try{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				(this.response) => callback();
			}
		};
		xhttp.open(action, url, true);
		xhttp.send();
	}catch(e){Messages(`HTTPS-ERROR ${e}`);}
}

async function Send() {
	var msg = msgInput.value;
	if (msg === "") return;
	msgInput.value = "";
	Request("POST", `${url}?message={msg}`, Refresh());
}

document.getElementById("send").onclick = function () {
	Send();
};

async function Refresh() {
	Request("GET", url, ()=>{
		var response = this.responseText;
		response = response.replaceAll('@newline', '<br>');
		messages.innerHTML = response.replaceAll('"', '');	
	});
}

async function Pulse(){
	Refresh();
	setTimeout(500, Pulse());
}

document.getElementById("body").onload = function () {
	Pulse();
};
