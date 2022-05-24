var songa = new Audio("files/audios/default.ogg");
var songisplaying = false;
var awas = undefined;

function update(song){
    songa = new Audio("files/audios/"+ song +".ogg");
    //audio lenght check
    if(song == "uwu"){
        awas = 145000;
    }
}

function playstate(){
    if(songisplaying == false){
        songa.play();
        songisplaying = true;
        console.log("audio started");
        setTimeout(songisplaying = false, awas);
    } else if (songisplaying == true) {
        console.log("AUDIO NOT STARTED BECAUSE IS OTHER AUDIO IN THE LINE");
        return;
    }

}

function pausestate(){
    songa.pause();
    songisplaying = false;
    console.log("Paused audio");
}