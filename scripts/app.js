let currentWord;
let scrambledCurrentWord;
let userScore = 0;
let computerScore = 0;

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
    }else{
        if(isPlayerInput){
            alert("nope");
        }
    }
}

const handleUserInput = () => {
    wordCompare(document.querySelector(".wordGuessInput").value, true);
}

const computerWordGuess = () => {
    let computerGuess = scrambleWord(scrambledCurrentWord);
    console.log(computerGuess);
    wordCompare(computerGuess);
}

document.querySelector(".guessBtn").addEventListener("click", handleUserInput);

const play = async () => {
    await chooseWord(4);
    setInterval(computerWordGuess,5000);
}
play();
// computerWordGuess();