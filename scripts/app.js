  fetch("https://random-word-api.herokuapp.com/word")
  .then((response) => response.json())
  .then((data) => console.log(data));