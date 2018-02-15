import React from 'react';

class ConnectFourSquare extends React.Component {
  constructor (props) {
    console.log('square constructor');
    super(props);
  };
	


  
  
  render () {
    console.log('rendering square');

    return (
      <div class="square">
        <div class="piece"> Color: {this.props.color} </div>
      </div>

    );

  }


};

export default ConnectFourSquare;