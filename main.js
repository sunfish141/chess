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
  if (piece.piece == "pawn" && piece.color == "white") {
    // POSSIBLE MOVES
    possible = [
      { row: piece.row + 1, column: piece.column },
      { row: piece.row + 2, column: piece.column },
      //MAKE IT SO THE FOLLOWING MOVES ARE ONLY POSSIBLE IF ENEMY PIECES ARE DETECTED
    ];
    for (i = 0; i < pieces.length; i++) {
      //MOVE ONE SQUARE
      if (pieces[i].column == piece.column && pieces[i].row == piece.row + 1) {
        for (q = 0; q < possible.length; q++) {
          if (
            possible[q].column == piece.column &&
            possible[q].row == piece.row + 1
          ) {
            possible.splice(q, 1);
          } else if (
            possible[q].column == piece.column &&
            possible[q].row == piece.row + 2
          ) {
            possible.splice(q, 1);
          }
        } //MOVE TWO SQUARES
      } else if (
        (pieces[i].column == piece.column && pieces[i].row == piece.row + 2) ||
        piece.moved == true
      ) {
        for (q = 0; q < possible.length; q++) {
          if (
            possible[q].column == piece.column &&
            possible[q].row == piece.row + 2
          ) {
            possible.splice(q, 1);
          }
        }
      }
      if (
        pieces[i].column == piece.column - 1 &&
        pieces[i].row == piece.row + 1
      ) {
        console.log("EEEEE");
        if (pieces[i].color != piece.color) {
          possible.push({ row: piece.row + 1, column: piece.column - 1 });
        }
      } else if (
        pieces[i].column == piece.column + 1 &&
        pieces[i].row == piece.row + 1
      ) {
        console.log("EEEEE");
        if (pieces[i].color != piece.color) {
          possible.push({ row: piece.row + 1, column: piece.column + 1 });
        }
      }
    }
  } else if (piece.piece == "pawn" && piece.color == "black") {
    // POSSIBLE MOVES
    possible = [
      { row: piece.row - 1, column: piece.column },
      { row: piece.row - 2, column: piece.column },
      //MAKE IT SO THE FOLLOWING MOVES ARE ONLY POSSIBLE IF ENEMY PIECES ARE DETECTED
    ];
    for (i = 0; i < pieces.length; i++) {
      //MOVE ONE SQUARE
      if (pieces[i].column == piece.column && pieces[i].row == piece.row - 1) {
        for (q = 0; q < possible.length; q++) {
          if (
            possible[q].column == piece.column &&
            possible[q].row == piece.row - 1
          ) {
            possible.splice(q, 1);
          } else if (
            possible[q].column == piece.column &&
            possible[q].row == piece.row - 2
          ) {
            possible.splice(q, 1);
          }
        } //MOVE TWO SQUARES
      } else if (
        (pieces[i].column == piece.column && pieces[i].row == piece.row - 2) ||
        piece.moved == true
      ) {
        for (q = 0; q < possible.length; q++) {
          if (
            possible[q].column == piece.column &&
            possible[q].row == piece.row - 2
          ) {
            possible.splice(q, 1);
          }
        }
      }
      if (
        pieces[i].column == piece.column - 1 &&
        pieces[i].row == piece.row - 1
      ) {
        if (pieces[i].color != piece.color) {
          possible.push({ row: piece.row - 1, column: piece.column - 1 });
        }
      } else if (
        pieces[i].column == piece.column + 1 &&
        pieces[i].row == piece.row - 1
      ) {
        if (pieces[i].color != piece.color) {
          possible.push({ row: piece.row - 1, column: piece.column + 1 });
        }
      }
    }
  }
  console.log(possible);
  return possible;
}

function getCursorPosition(c, event) {
  const rect = c.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  let clickfound = false;
  let piecex = Math.floor(x / 80);
  let piecey = Math.floor(y / 80);
  let movefound = false;
  for (k = 0; k < pieces.length; k++) {
    if (pieces[k].selected == true) {
      if (pieces[k].color == currentturn) {
        let moves = possibleMoves(pieces[k]);
        console.log(k)
        console.log(moves);
          if (
            (moves.map((a) => a.row).includes(7 - piecey) &&
              moves.map((a) => a.column).includes(piecex)) == true
          ) {
            for (z = 0; z < pieces.length; z++) {
              if (pieces[z].column == piecex && pieces[z].row == 7 - piecey && pieces[z].color != pieces[k].color) {
                pieces.splice(z, 1);
                console.log(pieces);
              }
            }
            console.log(pieces)
            for(j = 0; j < pieces.length; j++)
            {
              if (pieces[j].selected == true)
              {
                pieces[j].column = piecex;
                pieces[j].row = 7 - piecey;
                pieces[j].selected = false;
                if (pieces[j].piece == "pawn") {
                  pieces[j].moved = true;
                }
              }
            }
            console.log(k)
            movefound = true;
          }
        if (currentturn == "white" && movefound == true) {
          currentturn = "black";
          console.log("switch");
        } else if (currentturn == "black" && movefound == true) {
          currentturn = "white";
        }
      }
      clickfound = true;
      pieces[k].selected = false;
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