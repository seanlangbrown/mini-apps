
var model = {};

//model of squares
model.board; // = [[null,null,null],[null,null,null],[null,null,null]];

//define pieces (may later be object, images, etc)
model.X = {};
model.X.val = 'X';
model.O = {};
model.O.val = 'O';

model.X.wins = 0;
model.O.wins = 0;

model.firstTurn = model.X;

model.movesAllowed;

//Alternate X.val and 0 turn
model.turn;

var toggleTurn = function() {
  if (model.turn === model.X) {
    model.turn = model.O;
  } else {
    model.turn = model.X;
  }
};


model.diagSum = function(piece) {
  var sum = 0;
  piece = piece ? piece : model.turn;
  //console.log('checking diagSum', piece);
  console.log('piece.val', piece.val);
  for(var i = 0; i < model.board.length; i++) {
    //console.log('checking', i);
    sum += +(model.board[i][i] === piece.val);
  }
  console.log('diagsum', piece.val, sum);
  return sum;
};

model.colSum = function(col, piece) {
  var sum = 0;
  piece = piece ? piece : model.turn;
  for(var i = 0; i < model.board.length; i++) {
    sum += +(model.board[i][col] === piece.val);
  }
  console.log('colsum', piece.val, sum);
  return sum;
};

model.rowSum = function(row, piece) {
  piece = piece ? piece : model.turn;
  var sum = 0;
  for(var i = 0; i < model.board[row].length; i++) {
    sum += +(model.board[row][i] === piece.val);
  }
  //console.log(sum);
  return sum;
};


var didWin = function() {
  //check board for win
  if(model.diagSum() === 3) {
    return true;
  }

  for(var i = 0; i < 3; i++) {
    if (model.rowSum(i) === 3 || model.colSum(i) === 3) {
      return true;
    }
  }

  return false;
};

var didTie = function() {
  //console.log('diagsum', diagSum(X.val));
  if(model.diagSum(model.X) === 0 || model.diagSum(model.O) === 0) {
    //return false;
  }
  for(var i = 0; i < 3; i++) {
    //console.log('row sums', rowSum(i, X.val), rowSum(i, O.val), colSum(i, X.val), colSum(i, O.val));
    if (model.rowSum(i, model.X) === 0 || model.rowSum(i, model.O) === 0 || model.colSum(i, model.X) === 0 || model.colSum(i, model.O) === 0) {
      return false;
    }
  }
  return true;
};

var view = {};

var displayMessage = function(message) {
  //put text above board
  document.getElementById('messageBar').innerText = message;
};

var displayInstructions = function() {
  //console.log('It\'s ' + turn + '\'s turn! Click to place a piece.');
  displayMessage('It\'s ' + model.turn.val + '\'s turn! Click to place a piece.');
};

var displayProhibitedMove = function() {
  displayMessage(turn.val + ', please choose an empty square');
}

var addPiece = function(row, col) {
  if(!model.board[row][col]) {
    //add piece to model
    model.board[row][col] = model.turn.val;
    //display a piece on the board
    displayPiece(row, col);
    return true;
  } else {
    displayProhibitedMove();
    return false;
  }
};

var displayPiece = function(row, col) {
  //add a piece to the DOM
  var id = row + ',' + col;
  //console.log(id);
  document.getElementById(id).innerText = model.turn.val;
};

var displayWins = function() {

  //append win counts to the DOM, with Name;
}

//var clearBoard
var init = function() {
  model.clearBoard();
};

model.clearBoard = function() {
  model.board = [[null,null,null],[null,null,null],[null,null,null]];
  var squares = document.querySelectorAll(".square");
  for(var i = 0; i < squares.length; i++) {
    squares[i].innerText = '_';
  }
  model.turn = model.firstTurn;
  model.movesAllowed = true;
  displayInstructions();
  displayWins();
};

var playMove = function(row, col) {
  //console.log('clicked', row, col);
//display message ^
//On click
  //get coordinates


  //fill square
  if(!model.movesAllowed) {
    return;
  }
  var validMove = addPiece(row, col);
  //check for win
  if(didWin()) {
    //display win message
    displayMessage(model.turn.val + ' won!');
    model.turn.wins++;
    model.firstTurn = model.turn;
    movesAllowed = false;
  } else if(didTie()) {
    //display tie message
    displayMessage('It\'s a tie');
    movesAllowed = false;
  } else if (!validMove) {
    return;
  } else {
    //toggle turn
    toggleTurn();
    //display instructions
    displayInstructions();
  }
};

document.addEventListener("DOMContentLoaded", init);

