var time = document.getElementById("time");
var timeico = document.getElementById("timeico");

const d = new Date();
let h = d.getHours();

if (h < 12 && h >= 5) {
    timeico.className = "fa fa-cloud-sun"
    time.innerHTML = " Buenos Dias."
} else if(h < 24 && h >= 19 || h < 6 && h >= 0){
    timeico.className = "fa fa-cloud-moon"
    time.innerHTML = " Buenas Noches."
} else {
    timeico.className = "fa fa-cloud-sun"
    time.innerHTML = " Buenas Tardes."
}
