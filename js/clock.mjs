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


let clockColor = '#0F0';    // noklusējuma krāsas
let secondColor = '#F00';

let canvas = document.getElementById("clockCanvas");     // canvas iestatīšana
let ctx = canvas.getContext("2d");
ctx.translate(175, 175);

export function drawClock(){
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

    ctx.fillStyle = secondColor;  // uzzīmē mazo sarkano punktu centrā
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

    // datums.innerHTML =     // laika izvade teksta formā
    // weekday[d.getDay()] + " " +
    // d.getDate() + dayEnd + " " +
    // months[d.getMonth()] + " " +
    // (d.getYear() + 1900) + " " +
    // hr + ':' +
    // (String(min).padStart(2, '0')) + ':' +
    // (String(sec).padStart(2, '0'));
}