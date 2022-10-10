let currentWord;
let scrambledCurrentWord;
let userScore = 0;
let computerScore = 0;
let difficulty = 4;
let computerGuessInterval = 5000;
let wordDefinition = "";
let definitionFound = false;
let guessInterval;

const getDefinition = async (word) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    console.log(word);
    await fetch(url).then((response) => response.json()).then((data)=>{ 
        if(data.title != "No Definitions Found"){
            setDefinition(data[0].meanings[0].definitions[0].definition)
            definitionFound = true;
        }
        }); 
}

const chooseWord = async (difficulty) => {
    definitionFound = false;
    let newWord = "";
    while(!definitionFound){
        const url = `https://random-word-api.herokuapp.com/word?length=${difficulty}`;
        await fetch(url).then((response) => response.json()).then((data)=>{newWord=data[0]});
        await getDefinition(newWord);
    }
    assignNewWord(newWord);
}

const scrambleWord  = (word) =>{
    let wordScrambled = false
    let letterArray = word.split("");
    let letterArrayLength = letterArray.length;
    let scrambledWord = "";
    while(!wordScrambled){
        for (let i=0; i<letterArrayLength-1; i++){
            const randNum = Math.floor(Math.random() *  letterArrayLength);
            let temp = letterArray[i];
            letterArray[i] = letterArray[randNum];
            letterArray[randNum] = temp;
        }
        scrambledWord = letterArray.join("");
        if(scrambledWord != word){
            wordScrambled = true;
        }
    }
    return scrambledWord;
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
    if (userScore == 10){
        alert("User wins");
    }else if (computerScore == 10){
        alert("Computer wins");
    }
}

const setDefinition = (definition) => {
    console.log(definition);
    document.querySelector(".definitionDisplay").innerHTML = definition;
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
    clearInterval(guessInterval);
    definitionFound = false;
    userScore = 0;
    computerScore = 0;
    difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    if (difficulty==3){
        computerGuessInterval = 5000;
    }else if (difficulty==5){
        computerGuessInterval = 3000;
    }else if (difficulty==8){
        computerGuessInterval = 2000;
    }
    await chooseWord(difficulty);
    guessInterval = setInterval(computerWordGuess,computerGuessInterval);
}

document.querySelector(".guessBtn").addEventListener("click", handleUserInput);
document.querySelector(".startBtn").addEventListener("click", gameStart);
// computerWordGuess();