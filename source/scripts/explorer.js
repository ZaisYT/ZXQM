var total_Arts = 6;
var total_Songs = 15;

function getNum(max, loops) {

    let list = [];

    while( list.length < loops ) {
        var r = Math.round( Math.random() * ( max - 0 ) + 0 );
        if( list.indexOf(r) === -1) list.push(r);
    }

    return list;
}

function redirect(type, id){
    switch (type){
        case 1:
            window.location.href=`player?id=${id}`;
        case 2:
            window.location.href=`artist?id=${id}`;
        default:
            console.error("No valid redirection type specified!");
    }

}

const selArts = getNum(total_Arts, 6);
const selSongs = getNum(total_Songs, 7);

console.log(selArts)
console.log(selSongs)

function generateContent() {

    function reds() {
        let ElementID = 1;
        for( Element in selArts ) {
            let art = document.getElementById(`mfy_${ElementID}`);
            art.setAttribute('onclick', `redirect(1, ${selSongs[Element]})`);
            ElementID += 1;
        }
    
        ElementID = 1;
        for( Element in selArts ) {
            let art = document.getElementById(`arts_${ElementID}`);
            art.setAttribute('onclick', `redirect(2, ${selArts[Element]})`);
            ElementID += 1;
        }
    }
    reds()

    fetch('https://raw.githubusercontent.com/ZaisYT/ZXQM-FILES/main/Song-API.json').then(res => res.json()).then(data => {

        let ElementID = 1;
        for( Element in selSongs ) {
            let art = document.getElementById(`mfy_${ElementID}`);
            let text = art.getElementsByTagName('h3')[0];
            text.innerHTML = data.Songs[selSongs[Element]].name;
            ElementID += 1
        }

        ElementID = 1;
        for( Element in selSongs ) {
            let art = document.getElementById(`mfy_${ElementID}`);
            let text = art.getElementsByTagName('img')[0];
            text.src = data.Songs[selSongs[Element]].imgfile;
            ElementID += 1
        }
    
        ElementID = 1;
        for( Element in selSongs ) {
            let art = document.getElementById(`mfy_${ElementID}`);
            let text = art.getElementsByTagName('p')[0];
            text.innerHTML = data.Songs[selSongs[Element]].artists[1];
            ElementID += 1
        }

    }).catch(e => console.error(e));

    fetch('https://raw.githubusercontent.com/ZaisYT/ZXQM-FILES/main/Artist-API.json').then(res => res.json()).then(data => {

        let ElementID = 1;
        for( Element in selArts ) {
            let art = document.getElementById(`arts_${ElementID}`);
            let text = art.getElementsByTagName('img')[0];
            text.src = data.Artists[selArts[Element]].pfp;
            ElementID += 1
        }
    
        ElementID = 1;
        for( Element in selArts ) {
            let art = document.getElementById(`arts_${ElementID}`);
            let text = art.getElementsByTagName('h3')[0];
            text.innerHTML = data.Artists[selArts[Element]].name;
            ElementID += 1
        }

    }).catch(e => console.error(e));

}

generateContent()
