let newWord;
const chooseWord = async (difficulty) => {
    const url = `https://random-word-api.herokuapp.com/word?length=${difficulty}`;
    const response = await fetch(url);
    return response.json();
}
//    .then((response) => response.json()).then((data) => console.log(data[0]));
const setWord = (word) => {
    newWord = word;
    document.querySelector(".scrambledWordDisplay").innerHTML = newWord;
}
chooseWord(4).then((data)=>{setWord(data[0])});