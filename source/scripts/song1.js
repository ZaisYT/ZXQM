var songa = new Audio("source/audios/song1.ogg");
songa.pause();
var songisplaying = false;
var awas = undefined;

function playstate(){
    if(songisplaying === false){
        songa.play();
        songisplaying = true;
        console.log("AUDIO STARTED");
        setTimeout(songisplaying = false, awas);
    } else if (songisplaying === true){
        console.log("AUDIO NOT STARTED BECAUSE TRACK IS ALREADY PLAYING");
        return;
    }
}

function pausestate(){
    songa.pause();
    songisplaying = false;
    console.log("AUDIO PAUSED");
}