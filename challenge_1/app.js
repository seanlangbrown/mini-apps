

//model of squares
var board; // = [[null,null,null],[null,null,null],[null,null,null]];

//define pieces (may later be object, images, etc)
var X = {};
X.val = 'X';
var O = {};
O.val = 'O';

X.wins = 0;
O.wins = 0;

var firstTurn = X.val;

var movesAllowed;

//Alternate X.val and 0 turn
var turn;

var toggleTurn = function() {
  if (turn === X.val) {
    turn = O.val;
  } else {
    turn = X.val;
  }
};


var diagSum = function(piece) {
  var sum = 0;
  piece = piece ? piece : turn;
  //console.log('checking diagSum', piece);
  for(var i = 0; i < board.length; i++) {
    //console.log('checking', i);
    sum += +(board[i][i] === piece);
  }
  //console.log('diagsum', piece, sum);
  return sum;
};

var colSum = function(col, piece) {
  var sum = 0;
  piece = piece ? piece : turn;
  for(var i = 0; i < board.length; i++) {
    sum += +(board[i][col] === piece);
  }
  return sum;
};

var rowSum = function(row, piece) {
  piece = piece ? piece : turn;
  var sum = 0;
  for(var i = 0; i < board[row].length; i++) {
    sum += +(board[row][i] === piece);
  }
  //console.log(sum);
  return sum;
};


var didWin = function() {
  //check board for win
  if(diagSum() === 3) {
    return true;
  }

  for(var i = 0; i < 3; i++) {
    if (rowSum(i) === 3 || colSum(i) === 3) {
      return true;
    }
  }

  return false;
};

var didTie = function() {
  //console.log('diagsum', diagSum(X.val));
  if(diagSum(X.val) === 0 || diagSum(O.val) === 0) {
    //return false;
  }
  for(var i = 0; i < 3; i++) {
    //console.log('row sums', rowSum(i, X.val), rowSum(i, O.val), colSum(i, X.val), colSum(i, O.val));
    if (rowSum(i, X.val) === 0 || rowSum(i, O.val) === 0 || colSum(i, X.val) === 0 || colSum(i, O.val) === 0) {
      return false;
    }
  }
  return true;
};

var displayMessage = function(message) {
  //put text above board
  document.getElementById('messageBar').innerText = message;
};

var displayInstructions = function() {
  //console.log('It\'s ' + turn + '\'s turn! Click to place a piece.');
  displayMessage('It\'s ' + turn + '\'s turn! Click to place a piece.');
};

var displayProhibitedMove = function() {
  displayMessage(turn + ', please choose an empty square');
}

var addPiece = function(row, col) {
  if(!board[row][col]) {
    //add piece to model
    board[row][col] = turn;
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
  document.getElementById(id).innerText = turn;
};


//var clearBoard
var init = function() {
  clearBoard();
};

var clearBoard = function() {
  board = [[null,null,null],[null,null,null],[null,null,null]];
  var squares = document.querySelectorAll(".square");
  for(var i = 0; i < squares.length; i++) {
    squares[i].innerText = '_';
  }
  turn = firstTurn;
  movesAllowed = true;
  displayInstructions();
};

var playMove = function(row, col) {
  //console.log('clicked', row, col);
//display message ^
//On click
  //get coordinates


  //fill square
  if(!movesAllowed) {
    return;
  }
  var validMove = addPiece(row, col);
  //check for win
  if(didWin()) {
    //display win message
    displayMessage(turn + ' won!');
    firstTurn = turn;
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

