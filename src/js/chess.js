document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('chess-board');
    let selectedPiece = null;
    let selectedSquare = null;

    const initialBoard = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ];

    const pieceIcons = {
        'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
        'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
    };

    function createBoard() {
        board.innerHTML = '';
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = (row + col) % 2 === 0 ? 'white' : 'black';
                square.dataset.row = row;
                square.dataset.col = col;
                if (initialBoard[row][col]) {
                    square.innerHTML = pieceIcons[initialBoard[row][col]];
                }
                square.addEventListener('click', () => handleSquareClick(square, row, col));
                board.appendChild(square);
            }
        }
    }

    function handleSquareClick(square, row, col) {
        if (selectedPiece) {
            // Move piece
            const oldRow = selectedSquare.dataset.row;
            const oldCol = selectedSquare.dataset.col;
            initialBoard[oldRow][oldCol] = '';
            initialBoard[row][col] = selectedPiece;
            selectedPiece = null;
            selectedSquare = null;
            createBoard();
        } else if (initialBoard[row][col]) {
            // Select piece
            selectedPiece = initialBoard[row][col];
            selectedSquare = square;
        }
    }

    createBoard();
});
