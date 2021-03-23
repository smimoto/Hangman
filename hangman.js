let words = ["FRANCE", "USA", "SPAIN", "ITALY", "CHINA", "ENGLAND", "SCOTLAND", "RUSSIA", "MEXICO", "CANADA", "GERMANY", "AUSTRIA", "POLAND", "HUNGARY", "GREECE", "KENYA", "EGYPT", "COLOMBIA", "THAILAND", "INDIA", "JAPAN", "TURKEY", "AUSTRALIA"]

let answer = ''
let maxWrong = 6
let mistakes = 0
let guessed = [];
let wordStatus = null

function randomWord() {
    answer = words[Math.floor(Math.random() * words.length)];
}


function generateButtons() {
    let buttonsHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter =>
        `
        <button 
        class="btn btn-lg btn-dark m-2" 
        id="` + letter + `" 
        onClick="handleGuess('` + letter + `')"
        >
        ` + letter + `
        
        </button>
        `).join('');

    document.getElementById('keyboard').innerHTML = buttonsHTML
}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord()
        checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
    }
}

function checkIfGameWon() {
    if (wordStatus === answer) {
        document.getElementById('keyboard').innerHTML = "You Won!!!"
        document.getElementById('paragraph').innerHTML = "The answer was:";
        document.getElementById('hangmanPic').src = 'images/9.jpg'
    }
}
function checkIfGameLost() {
    if (mistakes === maxWrong) {
        document.getElementById('paragraph').innerHTML = "";
        document.getElementById('keyboard').innerHTML = "Sorry, but you lost!"
        document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer
    }
}

function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
    document.getElementById('wordSpotlight').innerHTML = wordStatus;


}

function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes
}

function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('paragraph').innerHTML = "Guess the Country";
    document.getElementById('hangmanPic').src = 'images/0.jpg'
    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons()
}
function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = 'images/' + mistakes + '.jpg'
}
document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();


