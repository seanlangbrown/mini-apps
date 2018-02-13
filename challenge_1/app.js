
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
  //console.log('piece.val', piece.val);
  for(var i = 0; i < model.board.length; i++) {
    sum += +(model.board[i][i] === piece.val);
  }
  //console.log('diagsum', piece.val, sum);
  return sum;
};

model.stats.diagSumLeft = function(piece) {
  var sum = 0;
  piece = piece ? piece : model.turn;
  //console.log('checking diagSum', piece);
  console.log('piece.val', piece.val);
  var j = model.board.length - 1;
  for(var i = 0; i < model.board.length; i++) {
    console.log('checking', j, i);
    console.log('squal is', model.board[j][i]);
    sum += +(model.board[j][i] === piece.val);
    j -= 1;
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
  var win = false;
  if(model.stats.diagSum() === 3 || model.stats.diagSumLeft() === 3) {
    win = true;
  }

  for(var i = 0; i < 3; i++) {
    if (model.stats.rowSum(i) === 3 || model.stats.colSum(i) === 3) {
      win = true;
    }
  }

  if(win) {
    view.util.displayMessage(model.turn.val + ' won!');
    model.turn.wins++;
    model.firstTurn = model.turn;
    model.movesAllowed = false;
  }

  return win;
};

model.logic.didTie = function() {
  for(var i = 0; i < 3; i++) {
    //console.log('row sums', rowSum(i, X.val), rowSum(i, O.val), colSum(i, X.val), colSum(i, O.val));
    if (model.stats.rowSum(i, model.X) === 0 || model.stats.rowSum(i, model.O) === 0 || model.stats.colSum(i, model.X) === 0 || model.stats.colSum(i, model.O) === 0) {
      return false;
    }
  }
  //else tie
  view.displayTie();
  model.movesAllowed = false;
  return true;
};

model.logic.initiateMove = function(row, col) {
  console.log('move to', row, col);
  var validMove = model.mod.addPiece(row, col);
  if(validMove) {
    console.log('move');
    if(model.logic.didWin()) {
      console.log('win');
    //display win message
    return true;
    }
    if(model.logic.didTie()) {
      //display tie message
      return true;
    }
    //else valid move, prepare for next turn;
    model.mod.toggleTurn();
    //display instructions
    view.displayInstructions();
    return true;
  }
  return false;
};

model.logic.startGame = function() {
  model.board = [[null,null,null],[null,null,null],[null,null,null]];
  model.turn = model.firstTurn;
  model.movesAllowed = true;

  view.board.clearSquares();
  view.displayInstructions();
  view.displayWins();
};

var view = {};
view.util = {};
view.board = {};

view.util.displayMessage = function(message) {
  //put text above board
  document.getElementById('messageBar').innerText = message;
};

view.displayInstructions = function() {
  //console.log('It\'s ' + turn + '\'s turn! Click to place a piece.');
  view.util.displayMessage('It\'s ' + model.turn.val + '\'s turn! Click to place a piece.');
};

view.displayProhibitedMove = function() {
  view.util.displayMessage(turn.val + ', please choose an empty square');
}

view.displayTie = function() {
  view.util.displayMessage('It\'s a tie');
};

model.mod.addPiece = function(row, col) {
  if(!model.board[row][col]) {
    //add piece to model
    model.board[row][col] = model.turn.val;
    //display a piece on the board
    view.board.displayPiece(row, col);
    return true;
  } else {
    view.displayProhibitedMove();
    return false;
  }
};

view.board.displayPiece = function(row, col) {
  //add a piece to the DOM
  var id = row + ',' + col;
  //console.log(id);
  document.getElementById(id).innerText = model.turn.val;
};

view.displayWins = function() {

  //append win counts to the DOM, with Name;
}

view.board.clearSquares = function() {
  var squares = document.querySelectorAll(".square");
  for(var i = 0; i < squares.length; i++) {
    squares[i].innerText = '_';
  }
}

//var clearBoard
controller.init = function() {
  controller.clearBoard();
};

controller.clearBoard = function() {
  model.logic.startGame();
};

controller.playMove = function(row, col) {
  (model.movesAllowed && model.logic.initiateMove(row, col))
};

document.addEventListener("DOMContentLoaded", controller.init);

