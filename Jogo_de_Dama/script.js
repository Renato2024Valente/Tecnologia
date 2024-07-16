document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const pointsDisplay = document.getElementById('points');
    let points = 0;

    const boardSize = 8;
    let selectedPiece = null;

    // Create the board
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
            cell.dataset.row = row;
            cell.dataset.col = col;
            board.appendChild(cell);

            if ((row + col) % 2 !== 0 && (row < 3 || row > 4)) {
                const piece = document.createElement('div');
                piece.classList.add('piece');
                piece.classList.add(row < 3 ? 'black-piece' : 'red');
                cell.appendChild(piece);
                piece.draggable = true;
                piece.addEventListener('dragstart', onDragStart);
            }
        }
    }

    function onDragStart(event) {
        selectedPiece = event.target;
    }

    board.addEventListener('dragover', event => {
        event.preventDefault();
    });

    board.addEventListener('drop', event => {
        const targetCell = event.target.closest('.cell');
        if (targetCell && targetCell.classList.contains('black') && !targetCell.hasChildNodes()) {
            const originCell = selectedPiece.parentElement;
            const originRow = parseInt(originCell.dataset.row);
            const originCol = parseInt(originCell.dataset.col);
            const targetRow = parseInt(targetCell.dataset.row);
            const targetCol = parseInt(targetCell.dataset.col);

            if (Math.abs(targetRow - originRow) === 1 && Math.abs(targetCol - originCol) === 1) {
                targetCell.appendChild(selectedPiece);
            } else if (Math.abs(targetRow - originRow) === 2 && Math.abs(targetCol - originCol) === 2) {
                const middleRow = (originRow + targetRow) / 2;
                const middleCol = (originCol + targetCol) / 2;
                const middleCell = document.querySelector(`[data-row="${middleRow}"][data-col="${middleCol}"]`);
                if (middleCell.hasChildNodes()) {
                    const capturedPiece = middleCell.firstChild;
                    middleCell.removeChild(capturedPiece);
                    targetCell.appendChild(selectedPiece);
                    points += 1;
                    pointsDisplay.textContent = points;
                }
            }
        }
    });
});
