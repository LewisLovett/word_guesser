let currentWord;
let scrambledCurrentWord;
let userScore = 0;
let computerScore = 0;
let difficulty = 4;

const chooseWord = async (difficulty) => {
    const url = `https://random-word-api.herokuapp.com/word?length=${difficulty}`;
    await fetch(url).then((response) => response.json()).then((data)=>{assignNewWord(data[0])});
}

const scrambleWord  = (word) =>{
    let letterArray = word.split("");
    let letterArrayLength = letterArray.length;
    for (let i=0; i<letterArrayLength-1; i++){
        const randNum = Math.floor(Math.random() *  letterArrayLength);

        let temp = letterArray[i];
        letterArray[i] = letterArray[randNum];
        letterArray[randNum] = temp;
    }
    return letterArray.join("");
}

const assignNewWord = (word) =>{
    currentWord = word;
    scrambledCurrentWord = scrambleWord(word);
    document.querySelector(".scrambledWordDisplay").innerHTML = scrambledCurrentWord;

}

const wordCompare = (inputWord, isPlayerInput) => {
    if(inputWord==currentWord){
        if(isPlayerInput){
            userScore++;
        }else{
            computerScore++;
        }
        updateScore();
        chooseWord(difficulty);

    }else{
        if(isPlayerInput){
            alert("nope");
        }
    }
}

const updateScore = () => {
    document.querySelector(".playerScoreDisplay").innerHTML = userScore;
    document.querySelector(".computerScoreDisplay").innerHTML = computerScore;
}

const handleUserInput = () => {
    console.log(currentWord);
    wordCompare(document.querySelector(".wordGuessInput").value, true);
}

const computerWordGuess = () => {
    let computerGuess = scrambleWord(scrambledCurrentWord);
    wordCompare(computerGuess,false);
}



const gameStart = async () => {
    difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    await chooseWord(difficulty);
    setInterval(computerWordGuess,5000);
}

document.querySelector(".guessBtn").addEventListener("click", handleUserInput);
document.querySelector(".startBtn").addEventListener("click", gameStart);
// computerWordGuess();