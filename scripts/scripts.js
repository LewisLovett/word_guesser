
import fetch from 'node-fetch';

// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const url = "https://random-word-api.herokuapp.com/word";
// const response = ;
// fetch(url).then(response => response.text);
console.log(fetch(url).then(response => response.json));
