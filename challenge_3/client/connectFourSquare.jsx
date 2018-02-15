import React from 'react';

class ConnectFourSquare extends React.Component {
  constructor (props) {
    console.log('square constructor');
    super(props);
  };
	

    // return (
    //   <div class="square">
    //     <div class="piece"> Color: {this.props.color} </div>
    //   </div>

    // );
  
  
  render () {
    console.log('rendering square');

    return (
      <h1>Hello, world!</h1>
      );

    }


};

export default ConnectFourSquare;