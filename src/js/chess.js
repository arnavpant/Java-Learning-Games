document.addEventListener('DOMContentLoaded', () => {

    const board = document.getElementById('chess-board');

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
        for(let row = 0; row < 8; row++)
        {
            for (let col = 0; col < 8; col++)
            {
                const square = document.createElement('div');
                square.className = (row + col) % 2 === 0 ? 'white' : 'black';
                if(initialBoard[row][col]) {
                    square.innerHTML = pieceIcons(initialBoard[row][col]);

                }
                board.appendChild(square);
            }
        }
    }



createBoard();
})