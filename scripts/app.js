let newWord;
let scrambledWord;
let userScore;
let computerScore;

const chooseWord = async (difficulty) => {
    const url = `https://random-word-api.herokuapp.com/word?length=${difficulty}`;
    fetch(url).then((response) => response.json()).then((data)=>{scrambleWord(data[0])});
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
    scrambledWord = letterArray.join("");
    document.querySelector(".scrambledWordDisplay").innerHTML = scrambledWord;
    newWord = word;
}

const wordCompare = (inputWord, isPlayerInput) => {
    if(inputWord==newWord){
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
chooseWord(4);