const board = document.getElementById("game-board");
const startButton = document.getElementById("start-button");

const imageNames = [
  "C.png", "CSharp.png", "C++.png", "go.png",
  "html.png", "java.png", "JavaScript.png", "python.png"
];

let cards = [];
let flippedCards = [];
let matched = 0;

function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function createBoard() {
  // Tyhjennä lauta ja nollaa peli
  board.innerHTML = "";
  flippedCards = [];
  matched = 0;

  // Luo uudet kortit
  cards = imageNames.concat(imageNames);
  shuffleCards(cards);

  for (let i = 0; i < cards.length; i++) {
    let card = document.createElement("div");
    card.className = "card";

    let img = document.createElement("img");
    img.src = "img/" + cards[i];
    img.style.display = "none";

    card.appendChild(img);
    board.appendChild(card);

    card.addEventListener("click", function () {
      flipCard(img);
    });
  }
}

function flipCard(img) {
  if (flippedCards.length < 2 && img.style.display === "none") {
    img.style.display = "block";
    flippedCards.push(img);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  let img1 = flippedCards[0];
  let img2 = flippedCards[1];

  if (img1.src === img2.src) {
    matched++;
    if (matched === imageNames.length) {
      alert("Voitit pelin! 🎉");
    }
  } else {
    img1.style.display = "none";
    img2.style.display = "none";
  }

  flippedCards = [];
}

// Käynnistetään peli kun nappia painetaan
startButton.addEventListener("click", createBoard);
