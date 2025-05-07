const board = document.getElementById('game-board');

// Lista kuvatiedostoista (2 x jokainen kuva)
const images = [
    'C.png', 'C#.png', 'C++.png', 'go.png',
    'html.png', 'java.png', 'JavaScript.png', 'python.png'
];

let cards = [...images, ...images]; // 8 paria = 16 korttia
let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    shuffle(cards);
    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = 'img/' + cards[i];
        img.style.display = 'none';

        card.appendChild(img);
        card.addEventListener('click', () => flipCard(card, img));
        board.appendChild(card);
    }
}

function flipCard(card, img) {
    if (flippedCards.length < 2 && !img.classList.contains('matched') && img.style.display === 'none') {
        img.style.display = 'block';
        flippedCards.push({ card, img });

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 800);
        }
    }
}

function checkMatch() {
    const [first, second] = flippedCards;

    if (first.img.src === second.img.src) {
        first.img.classList.add('matched');
        second.img.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === images.length) {
            setTimeout(() => alert('Voitit pelin! Kaikki parit löytyivät! 🎉'), 200);
        }
    } else {
        first.img.style.display = 'none';
        second.img.style.display = 'none';
    }

    flippedCards = [];
}

createBoard();
