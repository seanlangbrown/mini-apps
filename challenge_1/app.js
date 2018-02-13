
var model = {};
var controller = {};
model.mod = {}; 
model.logic = {};
model.stats = {};

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

model.mod.toggleTurn = function() {
  if (model.turn === model.X) {
    model.turn = model.O;
  } else {
    model.turn = model.X;
  }
};


model.stats.diagSum = function(piece) {
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

model.stats.colSum = function(col, piece) {
  var sum = 0;
  piece = piece ? piece : model.turn;
  for(var i = 0; i < model.board.length; i++) {
    sum += +(model.board[i][col] === piece.val);
  }
  console.log('colsum', piece.val, sum);
  return sum;
};

model.stats.rowSum = function(row, piece) {
  piece = piece ? piece : model.turn;
  var sum = 0;
  for(var i = 0; i < model.board[row].length; i++) {
    sum += +(model.board[row][i] === piece.val);
  }
  //console.log(sum);
  return sum;
};


model.logic.didWin = function() {
  //check board for win
  if(model.stats.diagSum() === 3) {
    return true;
  }

  for(var i = 0; i < 3; i++) {
    if (model.stats.rowSum(i) === 3 || model.stats.colSum(i) === 3) {
      return true;
    }
  }

  return false;
};

model.logic.didTie = function() {
  for(var i = 0; i < 3; i++) {
    //console.log('row sums', rowSum(i, X.val), rowSum(i, O.val), colSum(i, X.val), colSum(i, O.val));
    if (model.stats.rowSum(i, model.X) === 0 || model.stats.rowSum(i, model.O) === 0 || model.stats.colSum(i, model.X) === 0 || model.stats.colSum(i, model.O) === 0) {
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

model.mod.addPiece = function(row, col) {
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
  controller.clearBoard();
};

controller.clearBoard = function() {
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

controller.playMove = function(row, col) {
  //console.log('clicked', row, col);
//display message ^
//On click
  //get coordinates


  //fill square
  if(!model.movesAllowed) {
    return;
  }
  var validMove = model.mod.addPiece(row, col);
  //check for win
  if(model.logic.didWin()) {
    //display win message
    displayMessage(model.turn.val + ' won!');
    model.turn.wins++;
    model.firstTurn = model.turn;
    model.movesAllowed = false;
  } else if(model.logic.didTie()) {
    //display tie message
    displayMessage('It\'s a tie');
    model.movesAllowed = false;
  } else if (!validMove) {
    return;
  } else {
    //toggle turn
    model.mod.toggleTurn();
    //display instructions
    displayInstructions();
  }
};

document.addEventListener("DOMContentLoaded", init);

