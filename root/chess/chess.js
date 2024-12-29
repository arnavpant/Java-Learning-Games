let board = null;
let game = new Chess();
const gameStatus = document.getElementById('game-status');
const resetBtn = document.getElementById('reset-btn');

// Initialize the board
function initBoard() {
  console.log('Initializing board...');

  try {
    // Check if Chessboard.js is loaded
    if (typeof Chessboard === 'undefined') {
      console.error('Chessboard.js library is not loaded.');
      return;
    }

    // Initialize the chessboard
    board = Chessboard('board', {
      draggable: true,
      position: 'start',
      onDrop: handleMove,
      onDragStart: handleDragStart,
      onSnapEnd: updatePosition,
    });
    console.log('Board initialized successfully.');
  } catch (error) {
    console.error('Error initializing board:', error);
  }
}

// Handle piece drag start
function handleDragStart(source, piece) {
  if (game.game_over()) return false; // Prevent dragging if the game is over
  if (
    (game.turn() === 'w' && piece.startsWith('b')) ||
    (game.turn() === 'b' && piece.startsWith('w'))
  ) {
    return false; // Prevent dragging opponent's pieces
  }
}

// Handle move
function handleMove(source, target) {
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q', // Always promote to a queen
  });

  if (move === null) return 'snapback'; // Invalid move

  updateStatus();
  setTimeout(makeAIMove, 500); // Make AI move
}

// Update the board position after the piece is dropped
function updatePosition() {
  board.position(game.fen());
}

// Make a simple AI move
function makeAIMove() {
  if (game.game_over()) return;

  const moves = game.moves();
  if (moves.length > 0) {
    const bestMove = findBestMove(moves);
    game.move(bestMove);
    board.position(game.fen());
    updateStatus();
  }
}

// Find the best move (currently random)
function findBestMove(moves) {
  return moves[Math.floor(Math.random() * moves.length)];
}

// Update game status
function updateStatus() {
  if (game.in_checkmate()) {
    gameStatus.textContent = `${game.turn() === 'w' ? 'Black' : 'White'} wins by checkmate!`;
  } else if (game.in_draw()) {
    gameStatus.textContent = 'Draw!';
  } else if (game.in_check()) {
    gameStatus.textContent = `${game.turn() === 'w' ? 'White' : 'Black'} is in check.`;
  } else {
    gameStatus.textContent = `${game.turn() === 'w' ? "White's Turn" : "Black's Turn"}`;
  }
}

// Reset the game
resetBtn.addEventListener('click', () => {
  game.reset();
  board.start();
  gameStatus.textContent = "White's Turn";
});

// Wait for DOM to fully load before initializing
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded, initializing board...');
  initBoard();
});
