let canvas = document.getElementById("canvo");
let ctx = canvas.getContext("2d");
let wrongAnswer = 0;
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

let clockColor = '#000';    // noklusējuma krāsas
let backgroundColor = '#F8F2DC';
let secondColor = '#F00';

switch(getCookie("styleInt")){     // ielādē iestatījumus no saglabātā cookie
    case "0":
        clockColor = '#000';
        backgroundColor = '#F8F2DC';
        secondColor = '#F00';
        break;
    case "1":
        clockColor = '#FFF';
        backgroundColor = '#070d23';
        secondColor = '#0FF';
        break;
    case "2":
        clockColor = '#0F0';
        backgroundColor = '#000';
        secondColor = '#F00';
        break;
}

window.addEventListener("load",changeColors(backgroundColor, clockColor, getCookie("styleInt")));   // iestata background krāsu ielādējot mājaslapu


function changeColors(bgColor, altColor, selectedStyle) {  // krāsu maiņas funkcija
    document.body.style.background = bgColor;
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
            clockColor = '#000';
            backgroundColor = '#F8F2DC';
            secondColor = '#F00';
            break;
        case 1:
            clockColor = '#FFF';
            backgroundColor = '#070d23';
            secondColor = '#0FF';
            break;
        case 2:
            clockColor = '#0F0';
            backgroundColor = '#000';
            secondColor = '#F00';
            break;
    }
    changeColors(backgroundColor, clockColor, styleSelector);
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
            ctx.clearRect(0,0,400,500);
            ctx.font = "30px Arial";
            ctx.fillText("You lost!", 10, 50);
            setTimeout(function() {actuallyResetGame();}, 5000)
            break;
        case 1:
            ctx.clearRect(0,0,400,500);
            ctx.font = "30px Arial";
            ctx.fillText("You win!", 10, 50);
            setTimeout(function() {actuallyResetGame();}, 5000)
            break;
    }
}


function actuallyResetGame(){
    console.log("SA*UFHGWUIKDGB");
    ctx.clearRect(0,0,400,500);
    wrongAnswer = 0;
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
                    console.log(guessOutput);
                    letterCheck = true;
                }
            }
            if(!letterCheck){
                dead();
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


function dead() {
    wrongAnswer++;
    switch (wrongAnswer) {
    // Frame
        case 1:
            ctx.beginPath();
            ctx.lineWidth = 5
            ctx.strokeStyle = "#B27C66"
            ctx.moveTo(75,450);
            ctx.lineTo(75,45);
            ctx.stroke();
            break;
        case 2:
            ctx.beginPath();
            ctx.moveTo(75,47.5);
            ctx.lineTo(325,47.5);
            ctx.stroke();
            break;
        case 3:
            ctx.beginPath();
            ctx.moveTo(322.5,47.7);
            ctx.lineTo(322.5,450);
            ctx.stroke();
            break;
        case 4:
            ctx.beginPath();
            ctx.moveTo(200,45);
            ctx.lineTo(200,100);
            ctx.stroke();
            break;
    // Head
        case 5:
            ctx.beginPath();
            ctx.strokeStyle = "#000000"
            ctx.arc(200, 125, 25, 0, 2 * Math.PI);
            ctx.stroke();
            break;
    // Body
        case 6:
            ctx.beginPath();
            ctx.moveTo(200,150);
            ctx.lineTo(200,300);
            ctx.stroke();
            break;
    // Legs
        case 7:
            ctx.beginPath();
            ctx.moveTo(200,300);
            ctx.lineTo(235,390);
            ctx.stroke();
            break;
        case 8:
            ctx.beginPath();
            ctx.moveTo(200,300);
            ctx.lineTo(165,390);
            ctx.stroke();
            break;
    // Arms
        case 9:
            ctx.beginPath();
            ctx.moveTo(200,180);
            ctx.lineTo(250,260);
            ctx.stroke();
            break;
        case 10:
            ctx.beginPath();
            ctx.moveTo(200,180);
            ctx.lineTo(150,260);
            ctx.stroke();
            resetGame(0);
            break;
    }
}