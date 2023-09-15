// Array Of Words

const words: string[] = [
  "Hello",
  "Progamming",
  "Code",
  "JavaScript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Abdelali",
  "Eren",
  "Attack",
  "Titan",
  "Linkedin",
  "Twitter",
  "Github",
  "Errachidia",
  "Morocco",
  "Elzero",
  "School",
  "Future",
  "Loading",
  "Together",
  "World",
  "Beginners",
  "Laravel",
  "React",
  "Live",
  "Realmadrid",
  "Itme",
];

// Setting Levels
const lvls: Record<string, number> = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// Default Level
let defaultLevelName: string = "Normal";
let defaultLevelSeconds: number = lvls[defaultLevelName];

// Catch Selectors
let startButton: HTMLElement | null = document.querySelector(".start");
let lvlNameSpan: HTMLElement | null = document.querySelector(".message .lvl");
let secondsSpan: HTMLElement | null =
  document.querySelector(".message .seconds");
let theWord: HTMLElement | null = document.querySelector(".the-word");
let upcomingWords: HTMLElement | null =
  document.querySelector(".upcoming-words");
let input: HTMLInputElement | null = document.querySelector(".input");
let timeLeftSpan: HTMLElement | null = document.querySelector(".time span");
let scoreGot: HTMLElement | null = document.querySelector(".score .got");
let scoreTotal: HTMLElement | null = document.querySelector(".score .total");
let finishMessage: HTMLElement | null = document.querySelector(".finish");

// Setting Level Name + Seconds + score
if (lvlNameSpan && secondsSpan) {
  lvlNameSpan.innerHTML = defaultLevelName;
  secondsSpan.innerHTML = defaultLevelName.toString();
}

if (timeLeftSpan) {
  timeLeftSpan.innerHTML = defaultLevelSeconds.toString();
}

if (scoreTotal) {
  scoreTotal.innerHTML = words.length.toString();
}

// Disable Paste Event
if (input) {
  input.onpaste = function (event: Event) {
    event.preventDefault();
  };
}

// Start Game
if (startButton) {
  startButton.onclick = () => {
    if (this) {
      this.remove();
      if (input) {
        input.focus();
      }
      // Generate word function
      generateWords();
    }
  };
}

function generateWords() {
  // Get Random Word From Array
  let randomWord: string | undefined =
    words[Math.floor(Math.random() * words.length)];
  if (randomWord) {
    let wordIndex: number = words.indexOf(randomWord);
    // Remove the random word
    words.splice(wordIndex, 1);
    // Show the random word
    if (theWord) {
      theWord.innerHTML = randomWord;
    }
    // Empty upcoming words
    if (upcomingWords) {
      upcomingWords.innerHTML = "";
    }
    // Generate Words
    for (let i = 0; i < words.length; i++) {
      let div: HTMLDivElement = document.createElement("div");
      let txt: Text = document.createTextNode(words[i]);
      div.appendChild(txt);
      if (upcomingWords) {
        upcomingWords.appendChild(div);
      }
    }
    // Call start play func
    play();
  }
}

function play() {
  if (timeLeftSpan) {
    timeLeftSpan.innerHTML = defaultLevelSeconds.toString();
  }
  let start: number = setInterval(() => {
    if (timeLeftSpan) {
      timeLeftSpan.innerHTML = (
        parseInt(timeLeftSpan.innerHTML) - 1
      ).toString();
    }
    if (timeLeftSpan?.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      if (theWord && input) {
        // Compare Words
        if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
          // Empty Input Field
          input.value = "";
          if (scoreGot) {
            // Increase Score
            scoreGot.innerHTML = (parseInt(scoreGot.innerHTML) + 1).toString();
          }
          if (words.length > 0) {
            // Call Generate Word Function
            generateWords();
          } else if (finishMessage) {
            let span: HTMLSpanElement = document.createElement("span");
            span.className = "good";
            let spanText: Text = document.createTextNode("Congratulations");
            span.appendChild(spanText);
            finishMessage.appendChild(span);
            // Remove Upcoming Words Box
            if (upcomingWords) {
              upcomingWords.remove();
            }
          }
        } else if (finishMessage) {
          let span: HTMLSpanElement = document.createElement("span");
          span.className = "bad";
          let spanText: Text = document.createTextNode("Game Over");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
        }
      }
    }
  }, 1000);
}