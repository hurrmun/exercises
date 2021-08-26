// Ping Pong Score Keeper features

// score tracker for 2 players
// select for max points (5-10)
// Add point to player 1/2
// Reset button 

// When one player reaches the max point: 
// - disable add point buttons
// - change score color for winner and loser // use change event listener
const p1 = {
    score: 0,
    button: document.querySelector("#addp1"),
    display: document.querySelector("#p1display"),
    wins: 0,
    winsDisplay: document.querySelector("#p1wins")
}

const p2 = {
    score: 0,
    button: document.querySelector("#addp2"),
    display: document.querySelector("#p2display"),
    wins: 0,
    winsDisplay: document.querySelector("#p2wins")
}

const resetbtn = document.querySelector("#reset");
const resetWinsBtn = document.querySelector("#resetWins");

const winningScoreSelect = document.querySelector("#selectMax");

let isGameOver = false;
let winningScore = 5;

function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        if (player.score === winningScore && opponent.score === player.score - 1) {
            winningScore += 1;
        } else if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add("win");
            opponent.display.classList.add("lose");
            disableBtns();
            player.wins += 1;
            player.winsDisplay.innerText = player.wins;
        }
        player.display.innerText = player.score;
    }
}

p1.button.addEventListener("click", function () {
    updateScores(p1, p2);
});
p2.button.addEventListener("click", function () {
    updateScores(p2, p1);
});


resetbtn.addEventListener("click", reset);

resetWinsBtn.addEventListener("click", resetWins)

function reset() {
    isGameOver = false;
    for (p of [p1, p2]) {
        p.score = 0;
        p.display.innerText = 0;
        p.display.classList.remove("win", "lose");
        p.button.disabled = false;
        winningScore = parseInt(winningScoreSelect.value);
    }
}

winningScoreSelect.addEventListener("change", function () {
    reset();
    winningScore = parseInt(this.value);
});

function disableBtns() {
    p1.button.disabled = true;
    p2.button.disabled = true;
}

function resetWins() {
    for (p of [p1, p2]) {
        p.wins = 0;
        p.winsDisplay.innerText = 0;
    }
}