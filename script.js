// Basic chess setup using chess.js and chessboard.js (you’ll need to include these libraries for full functionality)

let board = null;
let game = new Chess();

document.getElementById("startBtn").addEventListener("click", () => {
  let difficulty = document.getElementById("difficulty").value;
  startGame(difficulty);
});

function startGame(difficulty) {
  board = Chessboard('board', {
    draggable: true,
    position: 'start',
    onDrop: handleMove
  });
}

function handleMove(source, target) {
  let move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });

  if (move === null) return 'snapback';

  window.setTimeout(() => makeBotMove(), 250);
  checkWinner();
}

function makeBotMove() {
  let difficulty = document.getElementById("difficulty").value;
  let possibleMoves = game.moves();

  if (possibleMoves.length === 0) return;

  let move;
  if (difficulty === "easy") {
    move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  } else if (difficulty === "medium") {
    move = possibleMoves[Math.floor(Math.random() * possibleMoves.length / 2)];
  } else {
    // Hard: pick best move using simple evaluation
    move = possibleMoves[0]; // placeholder for stronger logic
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
  document.getElementById("winner-popup").classList.remove("hidden");
}
