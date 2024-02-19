function mainpage(){
    window.location.href="index.html";
}

function player(num){
    window.location.href="player.html?id="+num;
}

function art(num){
    if(num == 1){
        window.location.href="badbunny.html";
    } else if (num == 2){
        window.location.href="crismj.html";
    } else {
        console.error("UNEXPECTED NUMBER PLEASE USE 1 OR 2");
    }
}

function faqpage(){
    window.location.href="faq.html";
}

function aboutpage(){
    window.location.href="about.html";
}

function contact(){
    window.location.href="contact.html";
}

function source(){
    window.location.href="sourcecode.html";
}

function github(){
    window.open("https://github.com/ZaisYT/ZXQM", '_blank');
}

function expl(){
    window.location.href="explorer.html";
}
