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
      turn: 'black',
      gameOver: false
    };
    
    this.addPieceToColumn = (colnum) => {
      console.log('executing');
      if (this.state.gameOver) {
        return;
      }
      let col = this.state.board[colnum].slice();
      //console.log('col', col);
      for (var i = col.length - 1; i > -1 ; i--) {
        if (col[i] === null) {

          if (!this.didWin(i, colnum) && !this.didTie()) {
            this.updateSquare(colnum, i, ()=>(this.state.turn), {turn: this.nextTurn()});
          }
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

  checkRow(rownum, colnum) {
    let coords = [[colnum, rownum]];
    let count = 1;
    for(var f = colnum + 1; f < this.state.board.length; f++) {
      if (this.state.board[f][rownum] === this.state.turn) {
        count++;
        coords.push([f, rownum]);
      } else {
        break;
      }
    }

    for(var b = colnum - 1; b > -1; b--) {
      if(this.state.board[b][rownum] === this.state.turn) {
        count++;
        coords.push([b, rownum]);
      } else {
        break;
      }
    }
    if (count > 3) {
      return coords;
    }
    return false;
  }

  checkCol(rownum, colnum) {
    console.log('checking column', colnum);
    let coords = [[colnum, rownum]];
    let count = 1;
    for(var f = rownum + 1; f < this.state.board[colnum].length; f++) {
      if (this.state.board[colnum][f] === this.state.turn) {
        count++;
        coords.push([colnum, f]);
      } else {
        break;
      }
    }

    for(var b = rownum - 1; b > -1; b--) {
      if (this.state.board[colnum][b] === this.state.turn) {
        count++;
        coords.push([colnum, b]);
      } else {
        break;
      }
    }
    if (count > 3) {
      return coords;
    }
    return false;
  }

  iterateDiagonal(i, callback) {

  }

  iterateLeftDiagonal(i, callback) {

  }

  updateSquare(colnum, rownum, callback, otherState) {
    let col = this.state.board[colnum].slice();
    //console.log('colum', colnum, 'row', rownum);
    col.splice(rownum, 1, callback(this.state.board[colnum][rownum])); //add piece to col
    //console.log('new column', col);
    let newboard = this.state.board.slice();
    newboard.splice(colnum, 1, col);
    let newState = {board: newboard}
    if (otherState !== undefined) {
      for (var key in otherState) {
        newState[key] = otherState[key];
      }
    }
    this.setState(newState);
    //console.log(this.state.board);
  }

  updateSquares(coords, callback, otherStates) {
    let newboard = this.state.board.slice();
    console.log('newboard', newboard);
    for (var i = 0; i < coords.length; i++) {
      let rownum = coords[i][1];
      let colnum = coords[i][0];
      console.log('colnum', colnum);
      let col = newboard[colnum].slice();
      col.splice(rownum, 1, callback(newboard[colnum][rownum], colnum, rownum)); //add piece to col
      newboard.splice(colnum, 1, col);
    }
    let newState = {board: newboard};
    if (otherStates !== undefined) {
      for (var key in otherStates) {
        newState[key] = otherStates[key]
      }
    }
    this.setState(newState);
    console.log('state was swet');
  }

  didWin(rownum, colnum) {
    let checks = [this.checkRow, this.checkCol];
    for (var i = 0; i < checks.length; i++) {
      let winningPieces = checks[i].call(this, rownum, colnum);
      if (winningPieces !== false) {
        console.log('winningPieces', winningPieces);
        this.updateSquares(winningPieces, (color, col, row) => {
          if (col === colnum && row === rownum) {
            return this.state.turn + ' win';
          }
          return color + ' win';
        }, {gameOver: true});
        // for(var j = 0; j < winningPieces.length; j++) {
        //   let coords = winningPieces[j];
        //   console.log('GAME OVER');
        //   this.updateSquare(coords[0], coords[1], (color) => (color + ' win'));
        // }
        console.log('GAME OVER: win');
        return true;
      }
    }
    return false;
  }

  didTie() {
    let tie = !_.includes(_.map(this.state.board, (col) => (_.includes(col, null))), true);
    if (tie) {
      console.log('GAME OVER: Tie');
      return true;
    }
    return false;
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









