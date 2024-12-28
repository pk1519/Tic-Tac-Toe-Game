const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetButton = document.querySelector('.reset-button');
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

let boardState = Array(9).fill('');

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            condition.forEach(index => cells[index].classList.add('winner'));
            gameActive = false;
            return boardState[a];
        }
    }
    return boardState.includes('') ? null : 'Draw';
}

function updateGame(index) {
    if (!gameActive || boardState[index]) return;
    boardState[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add('taken');

    const winner = checkWinner();
    if (winner) {
        statusText.textContent = winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
    boardState = Array(9).fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken', 'winner');
    });
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = "Player X's turn";
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => updateGame(index));
});
resetButton.addEventListener('click', resetGame);
