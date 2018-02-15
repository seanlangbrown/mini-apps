import React from 'react';
import ConnectFourSquare from './connectFourSquare.jsx';

class ConnectFourBoardCol extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    console.log('col click');
    this.props.addPiece(this.props.colnum);
    
  }
	
  render() {

    return (
        <div class="boardCol" onClick={this.onClick}>
          New Column
          {_.map(this.props.squares, (squareColor) => (<ConnectFourSquare color={squareColor}/>))}
        </div>
    );
  }

};



export default ConnectFourBoardCol;