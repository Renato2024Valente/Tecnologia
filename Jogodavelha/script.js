document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restart');
    let currentPlayer = 'X';
    let gameActive = true;
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    cells.forEach(cell => {
        cell.addEventListener('click', () => handleCellClick(cell));
    });

    restartButton.addEventListener('click', restartGame);

    function handleCellClick(cell) {
        const index = cell.getAttribute('data-index');
        if (cell.classList.contains('X') || cell.classList.contains('O') || !gameActive) return;
        cell.classList.add(currentPlayer);
        if (checkWin(currentPlayer)) {
            message.textContent = `Jogador ${currentPlayer} venceu!`;
            gameActive = false;
            return;
        }
        if (checkDraw()) {
            message.textContent = 'Empate!';
            gameActive = false;
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Jogador ${currentPlayer}, é sua vez!`;
    }

    function checkWin(player) {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return cells[index].classList.contains(player);
            });
        });
    }

    function checkDraw() {
        return [...cells].every(cell => {
            return cell.classList.contains('X') || cell.classList.contains('O');
        });
    }

    function restartGame() {
        cells.forEach(cell => {
            cell.classList.remove('X', 'O');
        });
        currentPlayer = 'X';
        gameActive = true;
        message.textContent = `Jogador ${currentPlayer}, é sua vez!`;
    }
});
