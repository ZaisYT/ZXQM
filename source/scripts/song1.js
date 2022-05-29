var songa = new Audio("source/audios/NenaMaldicion.mp3");
var songisplaying = false;

var loopbox = document.getElementById("loop");
var slider = document.getElementById("volume");
var progress = document.querySelector('#progress');

songa.loop = loopbox.checked;
songa.volume = slider.value;

slider.oninput = function() {
    songa.volume = this.value;
}

loopbox.oninput = function() {
    songa.loop = this.checked;
}

songa.addEventListener('timeupdate', function(){
    progress.value = songa.currentTime / songa.duration;
});

function playstate(){
    if(songisplaying == false){
        songa;
        songa.play();
        songisplaying = true;
        timeout();
        console.log("AUDIO STARTED");
    } else if (songisplaying == true){
        console.log("AUDIO NOT STARTED BECAUSE TRACK IS ALREADY PLAYING");
        return;
    }
}

function pausestate(){
    songa.pause();
    songisplaying = false;
    console.log("AUDIO PAUSED");
}

function timeout(){
    setTimeout(() => {
        songisplaying = false;
      }, 232000)
}