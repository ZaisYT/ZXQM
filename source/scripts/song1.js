var songa = new Audio("source/audios/NenaMaldicion.mp3");
var currentState = songa.paused;

var loopbox = document.getElementById("loop");
var slider = document.getElementById("volume");
var switchbtn = document.getElementById("switchbtn");
var progress = document.querySelector('#progress');

songa.loop = loopbox.checked;
songa.volume = slider.value;

slider.oninput = function() {
    songa.volume = this.value;
}

loopbox.oninput = function() {
    songa.loop = this.checked;
}

songa.addEventListener('timeupdate', function() {
    progress.value = songa.currentTime / songa.duration;
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
        songa;
        songa.play();
        console.log("AUDIO STARTED");
    } else if(currentState == false) {
        songa.pause();
        console.log("AUDIO PAUSED");
    }
}