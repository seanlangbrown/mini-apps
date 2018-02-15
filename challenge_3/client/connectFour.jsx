import React from 'react';
import ConnectFourSquare from './connectFourSquare.jsx';


class ConnectFour extends React.Component {
  constructor(props) {
    console.log('constructor');
    super(props);
  }


  render() {
    let message = <ConnectFourSquare />;
    console.log('rendering');
    return ( 
      <div class="board">
        {message} 
      </div>
    );
  }

};

export default ConnectFour;









