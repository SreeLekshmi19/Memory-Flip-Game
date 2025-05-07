const grid = document.getElementById("game-grid");
const movesText = document.getElementById("moves");
const err = document.getElementById("err");

const symbols = ['🐯', '🐱', '🐰', '🦊', '🐼', '🦁', '🐨', '🐻'];
let cardValues = [...symbols, ...symbols];
let flippedCards = [];
let lockBoard = false;
let moves = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(symbol) {
    const card = document.createElement("div");
    card.classList.add("card");

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const front = document.createElement("div");
    front.classList.add("card-front");
    front.innerHTML = "❓";

    const back = document.createElement("div");
    back.classList.add("card-back");
    back.innerHTML = symbol;

    cardInner.appendChild(front);
    cardInner.appendChild(back);
    card.appendChild(cardInner);

    card.addEventListener("click", () => flipCard(card, symbol));

    return card;
}

function flipCard(card, symbol) {
    if (lockBoard || card.classList.contains("flip")) return;

    card.classList.add("flip");
    flippedCards.push({ card, symbol });

    if (flippedCards.length === 2) {
        lockBoard = true;
        moves++;
        movesText.textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const [first, second] = flippedCards;

    if (first.symbol === second.symbol) {
        flippedCards = [];
        lockBoard = false;

        if (document.querySelectorAll(".flip").length === 16) {
            err.innerText = "You Win! Total Moves : " + moves;
            err.style.color = "#32CD32";
        }
    } else {
        setTimeout(() => {
            first.card.classList.remove("flip");
            second.card.classList.remove("flip");
            flippedCards = [];
            lockBoard = false;
        }, 800);
    }
}

function initGame() {
    grid.innerHTML = "";
    moves = 0;
    movesText.textContent = "0";
    err.textContent = "";
    const shuffled = shuffle(cardValues.slice());

    shuffled.forEach(symbol => {
        const card = createCard(symbol);
        grid.appendChild(card);
    });
}

initGame();
