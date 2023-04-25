const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let squarewidth = canvas.width / 8;
let squareheight = canvas.height / 8;

let pieces = [
  { piece: "pawn", color: "white", column: "a", row: 2 },
  { piece: "pawn", color: "white", column: "b", row: 2 },
  { piece: "pawn", color: "white", column: "c", row: 2 },
  { piece: "pawn", color: "white", column: "d", row: 2 },
  { piece: "pawn", color: "white", column: "e", row: 2 },
  { piece: "pawn", color: "white", column: "f", row: 2 },
  { piece: "pawn", color: "white", column: "g", row: 2 },
  { piece: "pawn", color: "white", column: "h", row: 2 },
  { piece: "rook", color: "white", column: "a", row: 1 },
  { piece: "rook", color: "white", column: "h", row: 1 },
  { piece: "knight", color: "white", column: "b", row: 1 },
  { piece: "knight", color: "white", column: "g", row: 1 },
  { piece: "bishop", color: "white", column: "c", row: 1 },
  { piece: "bishop", color: "white", column: "f", row: 1 },
  { piece: "queen", color: "white", column: "d", row: 1 },
  { piece: "king", color: "white", column: "e", row: 1 },
  //black pieces
  { piece: "pawn", color: "black", column: "a", row: 7 },
  { piece: "pawn", color: "black", column: "b", row: 7 },
  { piece: "pawn", color: "black", column: "c", row: 7 },
  { piece: "pawn", color: "black", column: "d", row: 7 },
  { piece: "pawn", color: "black", column: "e", row: 7 },
  { piece: "pawn", color: "black", column: "f", row: 7 },
  { piece: "pawn", color: "black", column: "g", row: 7 },
  { piece: "pawn", color: "black", column: "h", row: 7 },
  { piece: "rook", color: "black", column: "a", row: 8 },
  { piece: "rook", color: "black", column: "h", row: 8 },
  { piece: "knight", color: "black", column: "b", row: 8 },
  { piece: "knight", color: "black", column: "g", row: 8 },
  { piece: "bishop", color: "black", column: "c", row: 8 },
  { piece: "bishop", color: "black", column: "f", row: 8 },
  { piece: "queen", color: "black", column: "d", row: 8 },
  { piece: "king", color: "black", column: "e", row: 8 },
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
    let x = 10 + (pieces[i].column.charCodeAt() - 97) * 80;
    let y = 650 - pieces[i].row * 80;
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
