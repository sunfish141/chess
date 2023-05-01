const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let squarewidth = canvas.width / 8;
let squareheight = canvas.height / 8;
let lastSelection;
let currentturn = "white";

const imageUrls = [
  "img\\whitepawn.png",
  "img\\whiteknight.png",
  "img\\whitebishop.png",
  "img\\whiterook.png",
  "img\\whitequeen.png",
  "img\\whiteking.png",
  "img\\blackpawn.png",
  "img\\blackknight.png",
  "img\\blackbishop.png",
  "img\\blackrook.png",
  "img\\blackqueen.png",
  "img\\blackking.png",
];

const images = [];

// Load each image and add it to the images array
imageUrls.forEach((url) => {
  const img = new Image();
  img.src = url;
  img.onload = () => {
    images.push(img);
  };
});

let pieces = [
  {
    piece: "pawn",
    color: "white",
    column: 0,
    row: 1,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "white",
    column: 1,
    row: 1,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "white",
    column: 2,
    row: 1,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "white",
    column: 3,
    row: 1,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "white",
    column: 4,
    row: 1,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "white",
    column: 5,
    row: 1,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "white",
    column: 6,
    row: 1,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "white",
    column: 7,
    row: 1,
    selected: false,
    moved: false,
  },
  { piece: "rook", color: "white", column: 0, row: 0, selected: false },
  { piece: "rook", color: "white", column: 7, row: 0, selected: false },
  { piece: "knight", color: "white", column: 1, row: 0, selected: false },
  { piece: "knight", color: "white", column: 6, row: 0, selected: false },
  { piece: "bishop", color: "white", column: 2, row: 0, selected: false },
  { piece: "bishop", color: "white", column: 5, row: 0, selected: false },
  { piece: "queen", color: "white", column: 3, row: 0, selected: false },
  { piece: "king", color: "white", column: 4, row: 0, selected: false },
  //black pieces
  {
    piece: "pawn",
    color: "black",
    column: 0,
    row: 6,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "black",
    column: 1,
    row: 6,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "black",
    column: 2,
    row: 6,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "black",
    column: 3,
    row: 6,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "black",
    column: 4,
    row: 6,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "black",
    column: 5,
    row: 6,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "black",
    column: 6,
    row: 6,
    selected: false,
    moved: false,
  },
  {
    piece: "pawn",
    color: "black",
    column: 7,
    row: 6,
    selected: false,
    moved: false,
  },
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
    image.src = `img\\${e}.png`;
    ctx.drawImage(image, x, y, width, length);
  }
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
  drawPieces();
  requestAnimationFrame(draw);
}
draw();

function possibleMoves(piece) {
  let possible = [];
  if (piece.piece == "pawn") {
    // POSSIBLE MOVES
    possible = [
      { row: piece.row + 1, column: piece.column },
      { row: piece.row + 2, column: piece.column },
      { row: piece.row + 1, column: piece.column - 1 },
      { row: piece.row + 1, column: piece.column + 1 },
    ];
    for (i = 0; i < pieces.length; i++) {
      //MOVE ONE SQUARE
      if (pieces[i].column == piece.column && pieces[i].row == piece.row + 1) {
        for (q = 0; q < possible.length; q++) {
          if (
            (possible[i].column =
              piece.column && possible[i].row == piece.row + 1)
          ) {
            possible.splice(q, 1);
          } else if (
            (possible[i].column =
              piece.column && possible[i].row == piece.row + 2)
          ) {
            possible.splice(q, 1);
          }
        } //MOVE TWO SQUARES
      } else if (
        (pieces[i].column == piece.column && pieces[i].row == piece.row + 2) ||
        piece.moved == false
      ) {
        for (q = 0; q < possible.length; q++) {
          if (
            (possible[i].column =
              piece.column && possible[i].row == piece.row + 2)
          ) {
            possible.splice(q, 1);
          }
        }
      } else if (
        pieces[i].column == piece.column - 1 &&
        pieces[i].row == piece.row + 1
      ) {
      }
    }
  }
}

function getCursorPosition(c, event) {
  const rect = c.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  let clickfound = false;
  let piecex = Math.floor(x / 80);
  let piecey = Math.floor(y / 80);
  for (i = 0; i < pieces.length; i++) {
    if (pieces[i].selected == true) {
      if (pieces[i].color == currentturn) {
        let moves = possibleMoves(pieces[i]);
        pieces[i].column = piecex;
        pieces[i].row = 7 - piecey;
        if (currentturn == "white") {
          currentturn = "black";
          console.log("switch");
        } else {
          currentturn = "white";
        }
      }
      clickfound = true;
      pieces[i].selected = false;
    }
  }
  if (lastSelection != undefined) {
    pieces[lastSelection].selected = false;
  }
  if (clickfound == false) {
    for (i = 0; i < pieces.length; i++) {
      if (pieces[i].column == piecex && pieces[i].row == 7 - piecey) {
        pieces[i].selected = true;
        lastSelection = i;
      }
    }
  }
  console.log("x: " + piecex + " y: " + piecey);
}

const c = document.querySelector("canvas");
c.addEventListener("mousedown", function (e) {
  getCursorPosition(c, e);
});
