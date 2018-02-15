import React from 'react';
import ConnectFourSquare from './connectFourSquare.jsx';


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
  }


  render() {
    let boardCol = (squares) => {
      return (
        <div class="boardCol">
        New Column
        {_.map(squares, (squareColor) => (<ConnectFourSquare color={squareColor}/>))}
        </div>
        );
    }
    let squares = _.map(this.state.board, (col) => (boardCol(col)));
    console.log('rendering');
    return ( 
      <div class="board">
        {squares}
      </div>
    );
  }

};

export default ConnectFour;









