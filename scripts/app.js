let newWord;
let scrambledWord;

const chooseWord = async (difficulty) => {
    const url = `https://random-word-api.herokuapp.com/word?length=${difficulty}`;
    const response = await fetch(url);
    return response.json();
}
//    .then((response) => response.json()).then((data) => console.log(data[0]));
const setWord = (word) => {
    newWord = word;
    scrambleWord(word);
}
chooseWord(4).then((data)=>{setWord(data[0])});

const scrambleWord  = (newWord) =>{
    let letterArray = newWord.split("");
    let letterArrayLength = letterArray.length;

    for (let i=0; i<letterArrayLength-1; i++){
        const randNum = Math.floor(Math.random() *  letterArrayLength);

        let temp = letterArray[i];
        letterArray[i] = letterArray[randNum];
        letterArray[randNum] = temp;
    }
    scrambledWord = letterArray.join("");
    document.querySelector(".scrambledWordDisplay").innerHTML = scrambledWord;
}