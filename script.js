let board = null;
let game = null;

document.getElementById("startBtn").addEventListener("click", () => {
  game = new Chess();
  board = Chessboard('board', {
    draggable: true,
    position: 'start',
    onDrop: handleMove
  });
});

function handleMove(source, target) {
  let move = game.move({ from: source, to: target, promotion: 'q' });
  if (move === null) return 'snapback';
  setTimeout(makeBotMove, 500);
  checkWinner();
}

function makeBotMove() {
  let difficulty = document.getElementById("difficulty").value;
  let moves = game.moves();
  if (moves.length === 0) return;

  let move;
  if (difficulty === "easy") {
    move = moves[Math.floor(Math.random() * moves.length)];
  } else if (difficulty === "medium") {
    move = moves[Math.floor(Math.random() * (moves.length / 2))];
  } else {
    move = moves[0]; // placeholder for smarter AI
  }

  game.move(move);
  board.position(game.fen());
  checkWinner();
}

function checkWinner() {
  if (game.in_checkmate()) {
    let winner = game.turn() === 'w' ? "Black Wins!" : "White Wins!";
    showWinner(winner);
  } else if (game.in_draw()) {
    showWinner("It's a Draw!");
  }
}

function showWinner(text) {
  document.getElementById("winner-text").innerText = text;
  document.getElementById("winner-popup").style.display = "block";
}
