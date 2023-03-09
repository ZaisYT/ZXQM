var getURL = new URLSearchParams(window.location.search);
id = getURL.get('id');

// if (id == null) window.open('./error.html?type=noart', '_self');

const database = "./database/";

var verified = document.getElementById('verified');
var banner = document.getElementById('banner');
var artName = document.getElementById('artName');

var rcmndContents = document.getElementById('recommendedcontents');
var plistContents = document.getElementById('playlistcontents');
var library = document.getElementById('library');

var artRRSS = {};

var ownedSongs = [];
var featuredOrder = [];
var featuredSong;

fetch(`${database}users.json`).then(res => res.json()).then(data => {
    if (id == null) return false;

    let selData = data[id];

    if (selData.isPartner) verified.style.display = "flex";

    banner.src = selData.bannerURL;
    artName.innerHTML = selData.name;
    artName.title = selData.name;

    artRRSS = selData.RRSS;
    featuredSong = selData.featured;

    for (Element in selData.RRSS){
        if (selData.RRSS[Element] == null) document.getElementById(Element).style.display = 'none';
        document.getElementById(Element).setAttribute('onclick', `rrss('${Element}', '_blank')`);
    }

    for (Element in selData.ownedSongs){
        let value = selData.ownedSongs[Element];
        ownedSongs.push(value);
    }
    createContents('library');


    for (Element in selData.featuredSongs){
        let value = selData.featuredSongs[Element];
        featuredOrder.push(value);
    }
    createContents('featured');
    
}).catch(e => console.log(e));

function rrss(link, ref){
    window.open(artRRSS[link], ref);
}

function rTS(sid){
    window.open(`https://zxqm.cf/player.html?id=${sid}`, '_self');
}

function createContents(space){
    if (space == 'featured') {
        let spaced = document.getElementById('library');
        for (Element in featuredOrder){
            let maindiv = document.createElement('div');
            maindiv.className = 'song';

            let id = featuredOrder[Element];

            async function gd(){
                let datas = await fetch(`${database}songs.json`).then(res => res.json()).then(data => {
                    selData = data[id];
                    
                    obj = {
                        "title": selData['name'],
                        "img": selData['imgfile'],
                        "arts": selData['artists'],
                        "dur": selData['dur']
                    }

                    return obj; 
                }).catch(e => console.error(e));

                let img = document.createElement('img');
                img.src = datas['img'];

                maindiv.appendChild(img);
                
                let div = document.createElement('div');
                div.className = "infosong";

                let title = document.createElement('p');
                title.innerHTML = datas['title'];
                title.title = datas['title'];

                div.appendChild(title);

                let sdiv = document.createElement('div');

                let art = document.createElement('p');
                art.innerHTML = datas['arts']['1'];

                sdiv.appendChild(art);

                let dura = document.createElement('p');
                dura.innerHTML = datas['dur'];
    
                sdiv.appendChild(dura);
    
                let btn = document.createElement('button');
                if (datas['dur'] == "NO DISPONIBLE") btn.disabled = true;
                btn.setAttribute('onClick',"rTS("+ id + ");");
    
                let svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
                svg.setAttribute('xmlns',"http://www.w3.org/2000/svg");
                svg.setAttribute('version', '1.1');
                svg.setAttribute('xmlns:xlink', "http://www.w3.org/1999/xlink");
                svg.setAttribute('xmlns:svgjs', "http://svgjs.com/svgjs");
                svg.setAttribute('width', '25');
                svg.setAttribute('height', '25');
                svg.setAttribute('x', '0');
                svg.setAttribute('y', '0');
                svg.setAttribute('viewBox', '0 0 163.861 163.861');
                svg.setAttribute('style', "enable-background:new 0 0 512 512");
                svg.setAttribute('xml:space', "preserve");
                svg.setAttribute('class', "");
    
                let g = document.createElementNS("http://www.w3.org/2000/svg", 'g');
    
                let path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                path.setAttribute('d', "M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z");
                path.setAttribute('fill', "#fff");
                path.setAttribute('data-original', "#fff");
                path.setAttribute('class', "");
    
                g.appendChild(path);
                svg.appendChild(g);
                btn.appendChild(svg);
    
                div.appendChild(sdiv);
    
                maindiv.appendChild(div);
    
                maindiv.appendChild(btn);
            }
            gd();
            spaced.appendChild(maindiv);
        }
        return;
    }

    let spaced = document.getElementById('recommended');
    for (Element in ownedSongs){
        let maindiv = document.createElement('div');
        maindiv.className = 'song';

        let id = ownedSongs[Element];

        async function gd(){
            let datas = await fetch(`${database}songs.json`).then(res => res.json()).then(data => {
                selData = data[id];
                
                obj = {
                    "title": selData['name'],
                    "img": selData['imgfile'],
                    "arts": selData['artists'],
                    "dur": selData['dur']
                }

                return obj; 
            }).catch(e => console.error(e));

            let img = document.createElement('img');
            img.src = datas['img'];

            maindiv.appendChild(img);
            
            let div = document.createElement('div');
            div.className = "infosong";

            let title = document.createElement('p');
            title.innerHTML = datas['title'];
            title.title = datas['title'];

            div.appendChild(title);

            let sdiv = document.createElement('div');

            let art = document.createElement('p');
            art.innerHTML = datas['arts']['1'];

            sdiv.appendChild(art);

            let dura = document.createElement('p');
            dura.innerHTML = datas['dur'];

            sdiv.appendChild(dura);

            let btn = document.createElement('button');
            if (datas['dur'] == "NO DISPONIBLE") btn.disabled = true;
            btn.setAttribute('onClick',"rTS("+ id + ");");

            let svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
            svg.setAttribute('xmlns',"http://www.w3.org/2000/svg");
            svg.setAttribute('version', '1.1');
            svg.setAttribute('xmlns:xlink', "http://www.w3.org/1999/xlink");
            svg.setAttribute('xmlns:svgjs', "http://svgjs.com/svgjs");
            svg.setAttribute('width', '25');
            svg.setAttribute('height', '25');
            svg.setAttribute('x', '0');
            svg.setAttribute('y', '0');
            svg.setAttribute('viewBox', '0 0 163.861 163.861');
            svg.setAttribute('style', "enable-background:new 0 0 512 512");
            svg.setAttribute('xml:space', "preserve");
            svg.setAttribute('class', "");

            let g = document.createElementNS("http://www.w3.org/2000/svg", 'g');

            let path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            path.setAttribute('d', "M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z");
            path.setAttribute('fill', "#fff");
            path.setAttribute('data-original', "#fff");
            path.setAttribute('class', "");

            g.appendChild(path);
            svg.appendChild(g);
            btn.appendChild(svg);

            div.appendChild(sdiv);

            maindiv.appendChild(div);

            maindiv.appendChild(btn);
        }
        gd();
        spaced.appendChild(maindiv);
    }
}
