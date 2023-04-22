function getCookie(cname){      // Cookie dekodētājs no https://www.w3schools.com/js/js_cookies.asp
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while(c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if(c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

let clockColor = '#0F0';
let backgroundColor = '#000';

switch(getCookie("lightmode")){     // ielādē iestatījumus no saglabātā cookie
    case "0":
        clockColor = '#0F0';
        backgroundColor = '#000';
        // console.log("Light mode DISABLED");
        break;
    case "1":
        clockColor = '#000000';
        backgroundColor = '#FFFDDD';
        // console.log("Light mode ENABLED");
        break;
}

window.addEventListener("load",function() { changeColors(backgroundColor, clockColor) });   // iestata background krāsu ielādējot mājaslapu

let canvas = document.getElementById("clockcanva");
let ctx = canvas.getContext("2d");
ctx.translate(175, 175);

let weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

let months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


function colorMode(){   // iestata pretējo lapas stila režīmu un saglabā to cookie kad tiek nospiesta poga 
    let lm;
    if(getCookie("lightmode") == "1"){
        lm = 0;
    }
    else {
        lm = 1;
    }
    document.cookie = "lightmode=" + lm + "; expires=Thu, 18 Mar 2027 12:00:00 UTC; path=/; SameSite=Lax";
    switch(getCookie("lightmode")){
        case "0":
            clockColor = '#0F0';
            backgroundColor = '#000';
            // console.log("Light mode DISABLED");
            break;
        case "1":
            clockColor = '#000000';
            backgroundColor = '#FFFDDD';
            // console.log("Light mode ENABLED");
            break;
    }
    changeColors(backgroundColor, clockColor);
}


function drawClock(){
    const d = new Date();   // nolasa laiku (milisekundes, sekundes, minūtes un stundas)
    let ms = d.getMilliseconds();
    let sec = d.getSeconds();
    let min = d.getMinutes();
    let hr = d.getHours();

    ctx.fillStyle = clockColor;     // iestata krāsas
    ctx.strokeStyle = clockColor;

    ctx.setTransform(1, 0, 0, 1, 175, 175);  // novieto canvas sākumpunktu centrā un notīra canvu
    ctx.clearRect(-175,-175,350,350);
    
    ctx.beginPath();   // uzzīmē pulksteņa ārmalu
    ctx.arc(0,0,170,0,2*Math.PI);
    ctx.lineWidth = 7;
    ctx.stroke();

    ctx.beginPath();    // uzzīmē punktu centrā
    ctx.arc(0,0,8,0,2*Math.PI);
    ctx.fill();

    for(let i = 0; i < 12; i++){    // uzzīmē lielās iedaļas uz pulksteņa
        ctx.rotate(30 * Math.PI / 180);
        ctx.beginPath();
        ctx.lineWidth = "6";
        ctx.moveTo(142,0);
        ctx.lineTo(162,0);
        ctx.stroke();
    }

    for(let i = 0; i < 60; i++){  // uzzīmē mazās iedaļas uz pulksteņa
        ctx.rotate(6 * Math.PI / 180);
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.moveTo(150,0);
        ctx.lineTo(162,0);
        ctx.stroke();
    }
    
    ctx.setTransform(1, 0, 0, 1, 175, 175); // uzzīmē un rotē stundu rādītāju
    ctx.rotate((hr + min / 60) * 30 * Math.PI / 180);
    ctx.fillRect(-5,0,10,-90)

    ctx.setTransform(1, 0, 0, 1, 175, 175); // uzzīmē un rotē minūšu rādītāju
    ctx.rotate((min + sec / 60) * 6 * Math.PI / 180);
    ctx.fillRect(-5,0,10,-120)

    ctx.fillStyle = "#FF0000";  // uzzīmē mazo sarkano punktu centrā
    ctx.beginPath();
    ctx.arc(0,0,4,0,2*Math.PI);
    ctx.fill();

    ctx.setTransform(1, 0, 0, 1, 175, 175); // uzzīmē un rotē sekunžu rādītāju
    ctx.rotate((sec + ms/1000) * 6 * Math.PI / 180);
    ctx.fillRect(-2,0,4,-130)

    switch(d.getDate()){  // datuma galotne (1st, 2nd, 3rd, 4th..)    
        case 1:
        case 21:
        case 31:
            var dayEnd = "st";
            break;
        case 2:
        case 22:
            var dayEnd = "nd";
            break;
        case 3:
        case 23:
            var dayEnd = "rd";
            break;
        default: 
            var dayEnd = "th";
            break;
    }

    datums.innerHTML =     // laika izvade teksta formā
    weekday[d.getDay()] + " " +
    d.getDate() + dayEnd + " " +
    months[d.getMonth()] + " " +
    (d.getYear() + 1900) + " " +
    hr + ':' +
    (String(min).padStart(2, '0')) + ':' +
    (String(sec).padStart(2, '0'));
}


function changeColors(bgColor, altColor) {  // krāsu maiņas funkcija
    document.body.style.background = bgColor;
    document.getElementById("datums").style.color = altColor;
}


function changeClassMoment() {
    let Buttone = document.getElementById('modeButton');
    Buttone.classList.remove('.poga-style0','poga-style1');
    Buttone.classList.add('poga-style1');
}

setInterval(drawClock, 16); // zīmē pulksteni ik pēc 16ms, (60 reizes sekundē)