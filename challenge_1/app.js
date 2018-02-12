

//model of squares
var board = [['','',''],['','',''],['','','']];

//define pieces (may later be object, images, etc)
var X = 'X';
var O = 'O';

//Alternate X and 0 turn
var turn = X;

var toggleTurn = function() {
  if (turn === X) {
    turn = O;
  } else {
    turn = X;
  }
};


var diagSum = function() {
  var sum = 0;
  for(var i, j = 0; i < board.length; i++, j++) {
    sum += +(board[i][j] === turn);
  }
  return sum;
};

var colSum = function(col) {
  var sum = 0;
  for(var i = 0; i < board.length; i++) {
    sum += +(board[i][col] === turn);
  }
  return sum;
};

var rowSum = function(row) {
  var sum = 0;
  for(var i = 0; i < board[row].length; i++) {
    sum += +(board[row][i] === turn);
  }
  return sum;
};


var didWin = function() {
  //check board for win
  if(diagSum === 3) {
    return true;
  }

  for(var i = 0; i < 3; i++) {
    if (rowSum(i) === 3 || colSum(i) === 3) {
      return true;
    }
  }

  return false;
};

var postMessage = function(message) {
  //put text above board
};

var addPiece = function(row, col) {
  //add piece to model
  board[row][col] = turn;
  //display a piece on the board
};


//var clearBoard

var boardClick = function(row, col) {
  console.log('clicked');
//display message ^
//On click
  //get coordinates

  //fill square
  addPiece(row, col);
  //check for win
  if(didWin()) {
    //display win message
    postMessage(turn + ' won!');
    //display reset button??
  } else {
    //toggle turn
    toggleTurn();
    //display instructions
    postMessage('it\'s ' + turn + '\'s turn! Click to place a piece.');
  }
}


