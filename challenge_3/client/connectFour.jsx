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
          col.splice(i, 1, this.state.turn); //add piece to col
          //console.log('new column', col);
          let board = this.state.board.slice();
          board.splice(colnum, 1, col);
          this.setState({
            board: board, //update col in board
            turn: this.nextTurn()
          });
          console.log(this.state.board);
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



  render() {
    
    let squares = _.map(this.state.board, (col, i) => (<ConnectFourBoardCol squares={col} colnum={i} addPiece={this.addPieceToColumn} />));
    
    console.log('rendering');

    return ( 
      <div class="board">
        {squares}
      </div>
    );
  }

};

export default ConnectFour;









