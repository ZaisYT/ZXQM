var filenames = ["placeholder.ogg", "NenaMaldicion.mp3", "song1.ogg"];
var imgfilenames = ["placeholder.ogg", "NenaMaldicion.jpg", "song1.jpg"];

const getURL = new URLSearchParams(window.location.search);
id = getURL.get('id');

const jsonPath = "source/others/json";

var songa = new Audio("source/audios/" + filenames[id]);
var currentState = songa.paused;

var loopbox = document.getElementById("loop");
var slider = document.getElementById("volume");
var switchbtn = document.getElementById("switchbtn");
var duration = document.getElementById("duration");
var artist = document.getElementById("artist");
var namesong = document.getElementById("name");
var imgcontainer = document.querySelector('.infosong');
var progress = document.querySelector('#progress');
var title = document.querySelector('title');

songa.loop = loopbox.checked;
songa.volume = slider.value;

fetch(`${jsonPath}/${id}.json`).then(res => res.json()).then(data => {
    artist.innerHTML = data.artist;
    namesong.innerHTML = data.name;
    var imagen = document.createElement('img');
    imagen.src = "source/images/" + imgfilenames[id];
    imagen.className = "imageind"
    imgcontainer.appendChild(imagen);
    title.textContent = data.name + ' - ' + data.artist + ' // ZXQM';
}).catch(err => console.log(err));

slider.oninput = function() {
    songa.volume = this.value;
}

loopbox.oninput = function() {
    songa.loop = this.checked;
}

songa.addEventListener('timeupdate', function() {
    progress.value = songa.currentTime / songa.duration;
    var s = parseInt(songa.currentTime % 60);
    var m = parseInt((songa.currentTime / 60) % 60);
    if (s < 10) {
        s = '0' + s;
    }
    if (m < 10) {
        m = '0' + m;
    }
    var st = parseInt(songa.duration % 60);
    var mt = parseInt(songa.duration / 60);
    if (st < 10) {
        st = '0' + st;
    }
    if (mt < 10) {
        mt = '0' + mt;
    }
    duration.innerHTML = m + ':' + s + ' / ' + mt + ':' + st;
});

songa.addEventListener("play", function() {
    currentState = songa.paused;
});

songa.addEventListener("pause", function() {
    currentState = songa.paused;
});

switchbtn.addEventListener("click", function() {
    if(currentState == false) {
        switchbtn.innerText = "Play";
    } else if(currentState == true) {
        switchbtn.innerText = "Pause";
    }
});

function playerstate(){
    if (currentState == true){
        songa.play();
        console.log("AUDIO STARTED");
    } else if(currentState == false) {
        songa.pause();
        console.log("AUDIO PAUSED");
    }
}