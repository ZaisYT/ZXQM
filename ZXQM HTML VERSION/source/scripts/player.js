const getURL = new URLSearchParams(window.location.search);
id = getURL.get('id');

var toggled = true;
var lyr;

var file;
var artists = [];

var lyrid = [];
var sync = [];
var times;

var seeking;

var ismuted = false;

var loopbox = document.getElementById("loop");
var slider = document.getElementById("volume");
var switchbtn = document.getElementById("switchbtn");
var duration = document.getElementById("duration");
var artist = document.getElementById("artist");
var namesong = document.getElementById("name");
var lyrbtn = document.getElementById("lyrbtn");
var lyricshow = document.getElementById("lyricshow");
var volico = document.getElementById("volico");
var seekslider = document.getElementById("seekslider");

var imgcontainer = document.querySelector('.imgholder');
var lyricshowjq = document.querySelector(".lyricholder");
var title = document.querySelector('title');

lyricshowjq.style.display = "none";

fetch(`https://raw.githubusercontent.com/ZaisYT/ZXQM-FILES/main/lyrics/lyric${id}.json`).then(resl => resl.json()).then(datal => {
    for (element in datal.lyrics){
        if (element == 0 || !element || element == undefined || element == null){
            console.warn("WARN \\ NO HAY LETRAS PARA ESTA CANCION!");
        } else {
            value = datal.lyrics[element];
            lyr = document.createElement('p');
            lyr.innerHTML = value;
            lyr.className = "lyric t"+element;
            lyr.id = "t"+element;
            lyricshowjq.appendChild(lyr);
            lyricshow.style.display = "none";
            lyrid.push(value);
        }
    }

    for (element in datal.sync){
        if (element == 0 || !element || element == undefined || element == null){
            console.warn("WARN \\ NO HAY SYNC PARA ESTA CANCION!");
        } else {
            value = datal.sync[element];
            sync.push(value);
        }
    }

}).catch(errl => console.error(errl));

var songa = new Audio();

fetch(`https://raw.githubusercontent.com/ZaisYT/ZXQM-FILES/main/json/${id}.json`).then(res => res.json()).then(data => {
    for (element in data.artists){
        value = data.artists[element];
        artists.push(value);
    }

    namesong.innerHTML = data.name;

    var imagen = document.createElement('img');
    imagen.src = data.imgfile;
    imagen.className = "imageind";
    imgcontainer.appendChild(imagen);

    songa.src = data.file;

    title.textContent = artists[0] + " - " + data.name + " // ZXQM";

    if (artists.length == 0){
        console.error("INVALID JSON SYNTAX, NO ARTISTS FOUND");
    } else if (artists.length == 1){
        artist.innerHTML = artists[0];    
    } else if (artists.length == 2){
        let fullart = artists[0] + " & " + artists[1];
        artist.innerHTML = fullart;
    } else if (artists.length >= 3){
        let fullart = artists[0] + ", "+ artists[1] + " & " + artists[2];
        artist.innerHTML = fullart;
    }

    setTimeout(function(){
        let st = parseInt(songa.duration % 60);
        let mt = parseInt(songa.duration / 60);
        if (st < 10) {
            st = '0' + st;
        }
        if (mt < 10) {
            mt = '0' + mt;
        }
        duration.innerHTML = "00:00 / " + mt + ":" + st;
    }, 1000);

}).catch(err => console.error(err));

var currentState = songa.paused;

songa.loop = loopbox.checked;
songa.volume = slider.value;

seekslider.max = seekslider.offsetWidth

slider.oninput = function() {
    ismuted = false;
    songa.volume = this.value;
    let val = this.value;
    if (val > 0.4 && val < 1){
        volico.className = "fa fa-volume-high";
    } else if (val <= 0.4 && val > 0){
        volico.className = "fa fa-volume-low";
    } else if (val == 0){
        ismuted = true;
        volico.className = "fa fa-volume-xmark";
    }
}

loopbox.oninput = function() {
    songa.loop = this.checked;
}

songa.addEventListener('timeupdate', function() {
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
    checklyr();
    console.log(songa.currentTime);
    seektimeupdate();
});

songa.addEventListener("play", function() {
    currentState = songa.paused;
    checkswitch();
});

songa.addEventListener("pause", function() {
    currentState = songa.paused;
    checkswitch();
});

switchbtn.addEventListener("click", checkswitch());

lyrbtn.addEventListener("click", function() {
    if(toggled == false) {
        lyrbtn.title = "Ocultar Letras [L]";
    } else if(toggled == true) {
        lyrbtn.title = "Mostrar Letras [L]";
    }
});

window.addEventListener('keydown', function(event) {
    shortcuts(event.keyCode);
});

volico.addEventListener('click', function(){
    if(ismuted){
        ismuted = false;
        slider.value = 0.75;
        volico.className = "fa fa-volume-high";
        volico.title = "Mute [M]";
        songa.volume = slider.value;
    } else if (!ismuted){
        ismuted = true;
        slider.value = 0;
        volico.className = "fa fa-volume-xmark";
        volico.title = "Unmute [M]";
        songa.volume = slider.value;
    }
});

seekslider.addEventListener("mousedown", function(event){ seeking = true; seek(event); });
seekslider.addEventListener("mousemove", function(event){ seek(event); });
seekslider.addEventListener("mouseup", function(){ seeking = false; });

function seek(event){
    if(seeking){
        seekslider.value = event.clientX - seekslider.offsetLeft;
        var seekto = songa.duration * (seekslider.value / seekslider.offsetWidth);
        songa.currentTime = seekto;
    }
}

function seektimeupdate(){
    var nt = songa.currentTime * (seekslider.offsetWidth / songa.duration);
    seekslider.value = nt;
}

function mutebutton(){
    if(ismuted){
        ismuted = false;
        slider.value = 0.75;
        volico.className = "fa fa-volume-high";
        volico.title = "Mute [M]";
        songa.volume = slider.value;
    } else if (!ismuted){
        ismuted = true;
        slider.value = 0;
        volico.className = "fa fa-volume-xmark";
        volico.title = "Unmute [M]";
        songa.volume = slider.value;
    }
}

function playerstate(){
    if (currentState == true){
        songa.play();
    } else if(currentState == false) {
        songa.pause();
    }
}

function togglelyrics(){
    if(!toggled){
        toggled = true;
        lyricshowjq.style.display = "none";
        lyrbtn.title = "Mostrar Letras [L]";
        return;
    }
    if(toggled){
        toggled = false;
        lyricshowjq.style.display = "flex";
        lyrbtn.title = "Ocultar Letras [L]";
        return;
    }
}

function checklyr(){
    times = sync.length;
    lyrs = lyrid.length;
    checkfori = document.getElementById("t"+(lyrs));
    sel = 0;
    for (var i = 0; i < times; i++){
        if (songa.currentTime >= sync[sel] && songa.currentTime < sync[sel+1]){
            curlyr = document.getElementById("t"+(sel+1));
            curlyr.style.color = "#FF5100";
        }

        if (sel != 0){
            lastlyr = document.getElementById("t"+(sel));
        }

        if(songa.currentTime == 0){
            sel = 0;
            checkfori.style.color = "#FFF";
        }

        if (songa.currentTime < sync[sel+1] && songa.currentTime > sync[sel]){
            lastlyr.style.color = "#FFF";
        }
        sel++;
    }
}

function checkswitch(){
    if(currentState == true) {
        switchbtn.className = "switchbtn fa fa-play"
        switchbtn.title = "Play [SPACE]";
    } else if(currentState == false) {
        switchbtn.className = "switchbtn fa fa-pause";
        switchbtn.title = "Pause [SPACE]";
    }
}

function shortcuts(key){
    if (key == 32){
        playerstate();
    }
    if (key == 76){
        togglelyrics();
    }
    if (key == 82){
        if (loopbox.checked == true){
            loopbox.checked = false;
            songa.loop = false;
        } else if (loopbox.checked == false){
            loopbox.checked = true;
            songa.loop = true;
        }
    }
    if (key == 77){
        mutebutton();
    }
}
