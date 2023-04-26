const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let squarewidth = canvas.width / 8;
let squareheight = canvas.height / 8;
let lastSelection;

let pieces = [
  { piece: "pawn", color: "white", column: 0, row: 1, selected: false },
  { piece: "pawn", color: "white", column: 1, row: 1, selected: false },
  { piece: "pawn", color: "white", column: 2, row: 1, selected: false },
  { piece: "pawn", color: "white", column: 3, row: 1, selected: false },
  { piece: "pawn", color: "white", column: 4, row: 1, selected: false },
  { piece: "pawn", color: "white", column: 5, row: 1, selected: false },
  { piece: "pawn", color: "white", column: 6, row: 1, selected: false },
  { piece: "pawn", color: "white", column: 7, row: 1, selected: false },
  { piece: "rook", color: "white", column: 0, row: 0, selected: false },
  { piece: "rook", color: "white", column: 7, row: 0, selected: false },
  { piece: "knight", color: "white", column: 1, row: 0, selected: false },
  { piece: "knight", color: "white", column: 6, row: 0, selected: false },
  { piece: "bishop", color: "white", column: 2, row: 0, selected: false },
  { piece: "bishop", color: "white", column: 5, row: 0, selected: false },
  { piece: "queen", color: "white", column: 3, row: 0, selected: false },
  { piece: "king", color: "white", column: 4, row: 0, selected: false },
  //black pieces
  { piece: "pawn", color: "black", column: 0, row: 6, selected: false },
  { piece: "pawn", color: "black", column: 1, row: 6, selected: false },
  { piece: "pawn", color: "black", column: 2, row: 6, selected: false },
  { piece: "pawn", color: "black", column: 3, row: 6, selected: false },
  { piece: "pawn", color: "black", column: 4, row: 6, selected: false },
  { piece: "pawn", color: "black", column: 5, row: 6, selected: false },
  { piece: "pawn", color: "black", column: 6, row: 6, selected: false },
  { piece: "pawn", color: "black", column: 7, row: 6, selected: false },
  { piece: "rook", color: "black", column: 0, row: 7, selected: false },
  { piece: "rook", color: "black", column: 7, row: 7, selected: false },
  { piece: "knight", color: "black", column: 1, row: 7, selected: false },
  { piece: "knight", color: "black", column: 6, row: 7, selected: false },
  { piece: "bishop", color: "black", column: 2, row: 7, selected: false },
  { piece: "bishop", color: "black", column: 5, row: 7, selected: false },
  { piece: "queen", color: "black", column: 3, row: 7, selected: false },
  { piece: "king", color: "black", column: 4, row: 7, selected: false },
];

function drawBoard() {
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      ctx.beginPath();
      ctx.rect(
        0 + squarewidth * i,
        0 + squareheight * j,
        squarewidth,
        squareheight
      );
      if (i % 2 == 0) {
        if (j % 2 == 0) {
          ctx.fillStyle = "#FFFFFF";
        } else {
          ctx.fillStyle = "#89CFF0";
        }
      } else {
        if (j % 2 == 1) {
          ctx.fillStyle = "#FFFFFF";
        } else {
          ctx.fillStyle = "#89CFF0";
        }
      }
      ctx.fill();
      ctx.closePath();
    }
  }
}

function drawPieces() {
  for (i = 0; i < pieces.length; i++) {
    let e = pieces[i].color + pieces[i].piece;
    let x = 10 + pieces[i].column * 80;
    let y = 570 - pieces[i].row * 80;
    let width = 60;
    let length = 60;
    if (pieces[i].piece == "bishop") {
      width = 80;
      x -= 10;
    }
    const image = new Image();
    image.onload = function () {
      ctx.drawImage(image, x, y, width, length);
    };
    image.src = `img\\${e}.png`;
  }
}
function draw() {
  drawPieces();
  requestAnimationFrame(draw);
}
drawBoard();
draw();

function getCursorPosition(c, event) {
  const rect = c.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  let piecex = Math.floor(x / 80);
  let piecey = Math.floor(y / 80);
  pieces[lastSelection].selected = false;
  for (i = 0; i < pieces.length; i++) {
    if (pieces[i].column == piecex && pieces[i].row == piecey) {
      pieces[i].selected = true;
      lastSelection = i;
    }
  }
  console.log("x: " + piecex + " y: " + piecey);
}

const c = document.querySelector("canvas");
c.addEventListener("mousedown", function (e) {
  getCursorPosition(c, e);
});
