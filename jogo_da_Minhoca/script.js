const cells = document.querySelectorAll('.cell');
const rollDiceButton = document.getElementById('roll-dice');
const diceResultDiv = document.getElementById('dice-result');
const playerPositionDiv = document.getElementById('player-position');
const pieces = {
    red: document.getElementById('red-piece'),
    yellow: document.getElementById('yellow-piece'),
    green: document.getElementById('green-piece'),
    blue: document.getElementById('blue-piece')
};
let playerPositions = {
    red: 0,
    yellow: 0,
    green: 0,
    blue: 0
};
let currentPlayer = 'red';

rollDiceButton.addEventListener('click', () => {
    const diceResult = Math.floor(Math.random() * 6) + 1;
    diceResultDiv.textContent = `Resultado do Dado: ${diceResult}`;
    movePlayer(diceResult);
    currentPlayer = getNextPlayer(currentPlayer);
});

function movePlayer(diceResult) {
    playerPositions[currentPlayer] += diceResult;
    if (playerPositions[currentPlayer] >= cells.length) {
        playerPositions[currentPlayer] = cells.length - 1;
        playerPositionDiv.textContent = `Posição do Jogador: ${currentPlayer} - Finish`;
        alert(`${currentPlayer} ganhou!`);
    } else {
        const cell = cells[playerPositions[currentPlayer]];
        pieces[currentPlayer].style.left = cell.offsetLeft + 'px';
        pieces[currentPlayer].style.top = cell.offsetTop + 'px';
        playerPositionDiv.textContent = `Posição do Jogador: ${currentPlayer} - ${cell.className}`;
    }
}

function getNextPlayer(current) {
    const players = ['red', 'yellow', 'green', 'blue'];
    const currentIndex = players.indexOf(current);
    return players[(currentIndex + 1) % players.length];
}
