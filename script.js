/*
Steps To Create The Project
[01] Create HTML Markup
[02] Add Styling And Separate From Logic
[03] Create The App Logic
---[01] Add Levels
---[02] Show Level And Seconds
---[03] Add Array Of Words
---[04] Add Start Game Button
---[05] Generate Upcoming Words
---[06] Disable Copy Word And Paste Event + Focus On Input
---[07] Start Play Function
---[08] Start The Time And count Score
---[09] Add The Error And Success Messages
[04] Your Trainings To Add Features
---[01] Save Score to Local Storage With Date
---[02] Choose Levels From Select Box
---[03] Break The Logic To more Functions
---[04] Choose Array Of Words For Every Level
---[05] Write Game Instruction With Dynamic values
---[06] Add 3 Seconds For The First Word
*/

// Array Of Words

const words = [
  'Hello',
  'Progamming',
  'Code',
  'JavaScript',
  'Town',
  'Country',
  'Testing',
  'Youtube',
  'Abdelali',
  'Eren',
  'Attack',
  'Titan',
  'Linkedin',
  'Twitter',
  'Github',
  'Errachidia',
  'Morocco',
  'Elzero',
  'School',
  'Future',
  'Loading',
  'Together',
  'World',
  'Beginners',
  'Laravel',
  'React',
  'Live',
  'Realmadrid',
  'Itme'
];

// Setting Levels
const lvls = {
  'Easy': 5,
  'Normal': 3,
  'Hard': 2
};

// Default Level
let defaultLevelName = 'Normal';
let defaultLevelSeconds = lvls[defaultLevelName];

// Catch Selectors
let startButton = document.querySelector('.start')
let lvlNameSpan = document.querySelector('.message .lvl')
let secondsSpan = document.querySelector('.message .seconds')
let theWord = document.querySelector('.the-word')
let upcomingWords = document.querySelector('.upcoming-words')
let input = document.querySelector('.input')
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// Setting Level Name + Seconds + score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Disable Paste Event
input.onpaste = function() {
  return false;
}

// Start Game
startButton.onclick = function() {
  this.remove();
  input.focus();
  // Generate Word Function
  genWords();
}

function genWords() {
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // Get Word Index
  let wordIndex = words.indexOf(randomWord);
  // Remove word from Array
  words.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty upcoming Words
  upcomingWords.innerHTML = '';
  // Generate Words
  for (let i = 0; i < words.length; i++) {
    // Create Div Element
    let div = document.createElement('div');
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Call Start Play Function
  startPlay();
}  

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === '0') {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty Input Field
        input.value = '';
        // Increase Score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          // Call Generate Word Function
          genWords();
        } else {
          let span = document.createElement('span');
          span.className = 'good';
          let spanText = document.createTextNode('Congratulation');
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          // Remove Upcoming Words Box
          upcomingWords.romove();
        }
      } else {
        let span = document.createElement('span');
        span.className = 'bad';
        let spanText = document.createTextNode('Game Over');
        span.appendChild(spanText);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}