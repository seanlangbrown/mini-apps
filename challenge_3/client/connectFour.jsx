import React from 'react';
import ConnectFourSquare from './connectFourSquare.jsx';
import ConnectFourBoardCol from './connectFourBoardCol.jsx';


class ConnectFour extends React.Component {
  constructor(props) {
    console.log('constructor');
    super(props);
    this.state = {
      board: [
        [null, null, null, null, null, null], 
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        ],
      turn: 'black'
    };
    
    this.addPieceToColumn = (colnum) => {
      console.log('executing');
      let col = this.state.board[colnum].slice();
      //console.log('col', col);
      for (var i = col.length - 1; i > -1 ; i--) {
        if (col[i] === null) {
          this.updateSquare(colnum, i, ()=>(this.state.turn), {turn: this.nextTurn()})
          break;
        }
      }
    };

  }

  nextTurn() {
    if (this.state.turn === 'black') {
      return 'red';
    }
    return 'black';
  }

  iterateRow(i, callback) {

  }

  iterateCol(i, callback) {

  }

  iterateDiagonal(i, callback) {

  }

  iterateLeftDiagonal(i, callback) {

  }

  updateSquare(colnum, rownum, callback, otherStates) {
    let col = this.state.board[colnum].slice();
    //console.log('colum', colnum, 'row', rownum);
    col.splice(rownum, 1, callback(this.state.board[colnum][rownum])); //add piece to col
    //console.log('new column', col);
    let board = this.state.board.slice();
    board.splice(colnum, 1, col);
    let newState = {board: board}
    for (var key in otherStates) {
      newState[key] = otherStates[key];
    }
    this.setState(newState);
    //console.log(this.state.board);
  }

  didWin() {

  }



  render() {
    
    let squares = _.map(this.state.board, (col, i) => (<ConnectFourBoardCol squares={col} colnum={i} addPiece={this.addPieceToColumn} />));
    
    console.log('rendering');

    return ( 
      <div class="connectFour">
        <div class="board">
          {squares}
        </div>
        <div class="messages">Let's Play Connect Four!</div>
      </div>
    );
  }

};

export default ConnectFour;









