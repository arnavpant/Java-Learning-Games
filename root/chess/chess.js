const board = Chessboard('board', {
    draggable: true,
    position: 'start',
    onDrop: handleMove,
  });
  
  const game = new Chess();
  
  function handleMove(source, target) {
    const move = game.move({
      from: source,
      to: target,
      promotion: 'q', // Promote to queen
    });
  
    if (move === null) return 'snapback';
  
    // Simple AI move
    setTimeout(() => {
      const moves = game.moves();
      if (moves.length > 0) {
        const randomMove = moves[Math.floor(Math.random() * moves.length)];
        game.move(randomMove);
        board.position(game.fen());
      }
    }, 500);
  }
  
  function restartGame() {
    game.reset();
    board.start();
  }
  