if(document.cookie == ""){
    let x = new Date();
    let t = x.getTime();
    let expire = t + 365 * 24 * 60 * 60 * 1000;
    x.setTime(expire);
    document.cookie = "styleInt=" + 0 + 
    "; expires=" + x.toUTCString() + 
    "path=/; SameSite=Lax";
}

let canvas = document.getElementById("canvo");
let ctx = canvas.getContext("2d");
let wrongAnswer = 1;
const Words = ["apple", "berry", "cherry", "grape", "lemon", "lime", "mango", "peach", "pear", "plum", "banana", "carrot", "celery", "onion", "tomato", "pasta", "rice", "toast", "pizza", "burger", "salad", "sushi", "bagel", "croissant", "donut", "cheese", "chips", "pretzel", "cookie", "brownie", "fudge", "candy", "sugar", "honey", "jam", "syrup", "coffee", "juice", "tea", "water", "soda", "beer", "wine", "whiskey", "vodka", "gin", "rum", "tequila", "brandy", "bacon", "beef", "chicken", "pork", "fish", "shrimp", "clam", "crab", "lobster", "steak", "sausage", "hotdog", "ham", "turkey", "bacon", "beans", "corn", "peas", "potato", "rice", "salmon", "tuna", "trout", "carrot", "pepper", "onion", "garlic", "herbs", "spice", "salt", "pepper", "sugar", "flour", "butter", "oil", "vinegar", "cheese", "milk", "yogurt", "egg", "bread", "pasta", "soup", "stew", "sauce", "gravy", "dip", "chips", "cracker", "bread", "cake", "pie", "cookie", "brownie", "pudding", "icecream"];
const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
let guessedLetters = [];
let randomIndex = Math.floor(Math.random() * Words.length);
let word = Words[randomIndex].toUpperCase();
guessing.innerHTML = "";
console.log(word);
let guessOutput = "";
for (let i = 0; i < word.length; i++) {
    guessOutput = guessOutput + "_";
}
guessing.innerHTML = guessOutput;

addEventListener("keypress", letterEntered);

let blokeColor = '#000';    // noklusējuma krāsas
let backgroundColor = '#F8F2DC';
let secondColor = '#F00';

switch(getCookie("styleInt")){     // ielādē iestatījumus no saglabātā cookie
    case "0":
        blokeColor = '#000';
        backgroundColor = '#F8F2DC';
        secondColor = '#F00';
        break;
    case "1":
        blokeColor = '#FFF';
        backgroundColor = '#070d23';
        secondColor = '#0FF';
        break;
    case "2":
        blokeColor = '#0F0';
        backgroundColor = '#000';
        secondColor = '#F00';
        break;
}

window.addEventListener("load",changeColors(backgroundColor, blokeColor, getCookie("styleInt")));   // iestata background krāsu ielādējot mājaslapu


function changeColors(bgColor, altColor, selectedStyle) {  // krāsu maiņas funkcija
    document.body.style.background = bgColor;
    document.getElementById("inputType").style.color = altColor;
    document.getElementById("p1").style.color = altColor;
    document.getElementById("guessing").style.color = altColor;
    document.getElementById("wrong").style.color = altColor;
    document.getElementById("inputType").style.borderBottomColor = altColor;
    document.getElementById("inputType").style.backgroundColor = backgroundColor;
    let Buttons = document.querySelectorAll("#modeButton");
    for(let i = 0; i < Buttons.length; i++) {
        Buttons[i].classList.remove('.poga-style0','poga-style1','poga-style2');
        Buttons[i].classList.add('poga-style' + selectedStyle);
    }
}


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


function colorMode(){   // iestata nākamo lapas stila režīmu un saglabā to cookie kad tiek nospiesta poga 
    let styleSelector = parseInt(getCookie("styleInt"));
    if(styleSelector < 2){
        styleSelector++;
    }
    else{
        styleSelector = 0;
    }
    switch(styleSelector){
        case 0:
            blokeColor = '#000';
            backgroundColor = '#F8F2DC';
            secondColor = '#F00';
            break;
        case 1:
            blokeColor = '#FFF';
            backgroundColor = '#070d23';
            secondColor = '#0FF';
            break;
        case 2:
            blokeColor = '#0F0';
            backgroundColor = '#000';
            secondColor = '#F00';
            break;
    }
    changeColors(backgroundColor, blokeColor, styleSelector);
    dead(wrongAnswer);
    let now = new Date();
    let time = now.getTime();
    let expireDate = time + 365 * 24 * 60 * 60 * 1000;
    now.setTime(expireDate);
    document.cookie = "styleInt=" + styleSelector + 
    "; expires=" + now.toUTCString() + 
    "path=/; SameSite=Lax";
}


function resetGame(status){
    switch(status){
        case 0:
            ctx.clearRect(0,0,300,350);
            ctx.beginPath();
            ctx.lineWidth = "10";
            ctx.moveTo(225,40);
            ctx.lineTo(75,310);
            ctx.moveTo(75,40);
            ctx.lineTo(225,310);
            ctx.stroke();
            setTimeout(function() {actuallyResetGame();}, 2000);
            break;
        case 1:
            ctx.clearRect(0,0,300,350);
            ctx.beginPath();
            ctx.lineWidth = "10";
            ctx.moveTo(80,220);
            ctx.lineTo(125,280);
            ctx.lineTo(225,40);
            ctx.stroke();
            setTimeout(function() {actuallyResetGame();}, 2000);
            break;
    }
}


function actuallyResetGame(){
    // console.log("SA*UFHGWUIKDGB");
    ctx.clearRect(0,0,300,350);
    wrongAnswer = 1;
    guessedLetters = [];
    randomIndex = Math.floor(Math.random() * Words.length);
    word = Words[randomIndex].toUpperCase();
    guessing.innerHTML = "";
    console.log(word);
    guessOutput = "";
    for (let i = 0; i < word.length; i++) {
        guessOutput = guessOutput + "_";
    }
    guessing.innerHTML = guessOutput;
    wrong.innerHTML = "";
}


function setCharAt(str, index, chr) {
  if(index > str.length-1){
    return str;
  }
  return str.substring(0,index) + chr + str.substring(index+1);
}


function letterEntered(kad) {
    if(kad.keyCode == 13){
        Input = inputType.value.toUpperCase();
        inputType.value = "";
        let letterCheck = false;
        if (Input == "") {
            alert("wow thats an nothing");
        }
        else if (alphabet.includes(Input) !== true && Input != "") {
            alert("wow thats not a letter");
        }
        else {
            for (let i = 0; i < word.length; i++) {
                if (word[i].toUpperCase() == Input) {
                    guessOutput = setCharAt(guessOutput, i, Input);
                    // console.log(guessOutput);
                    letterCheck = true;
                }
            }
            if(!letterCheck){
                wrongAnswer++;
                dead(wrongAnswer);
                guessedLetters.push(Input);
            } 
        }
        guessing.innerHTML = guessOutput;
        if(guessOutput == word){
            resetGame(1);
        }
        wrong.innerHTML = guessedLetters;
    }
}

function dead(lives) {
    ctx.fillStyle = blokeColor;
    ctx.clearRect(0,0,300,350);
    for(let i = 0; i < lives; i++){
        switch(i) {
    // Frame
        case 1:
            ctx.fillRect(0, 0, 10, 350);
            break;
        case 2:
            ctx.fillRect(0, 0, 300, 10);
            break;
        case 3:
            ctx.fillRect(290, 0, 10, 350);
            break;
        case 4:
            ctx.fillRect(145, 0, 10, 50);
            break;
    // Head
        case 5:
            ctx.beginPath();
            ctx.arc(150, 90, 40, 0, 2 * Math.PI);
            ctx.fill();
            break;
    // Body
        case 6:
            ctx.fillRect(145,130,10,100);
            break;
    // Legs
        case 7:
            ctx.translate(150,225);
            ctx.rotate(-25 * Math.PI / 180);
            ctx.fillRect(-5,0,10,120);
            ctx.rotate(25 * Math.PI / 180);
            ctx.translate(-150,-225);
            break;
        case 8:
            ctx.translate(150,225);
            ctx.rotate(25 * Math.PI / 180);
            ctx.fillRect(-5,0,10,120);
            ctx.rotate(-25 * Math.PI / 180);
            ctx.translate(-150,-225);
            break;
    // Arms
        case 9:
            ctx.translate(150,135);
            ctx.rotate(-70 * Math.PI / 180);
            ctx.fillRect(-5,0,10,100);
            ctx.rotate(70 * Math.PI / 180);
            ctx.translate(-150,-135);
            break;
        case 10:
            ctx.translate(150,135);
            ctx.rotate(70 * Math.PI / 180);
            ctx.fillRect(-5,0,10,100);
            ctx.rotate(-70 * Math.PI / 180);
            ctx.translate(-150,-135);
            resetGame(0);
            break;
    }
    }
}