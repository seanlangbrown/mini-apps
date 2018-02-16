import React from 'react';
import _ from 'lodash';

class BowlingLane extends React.Component {
  constructor(props) {
	super(props);
  }

  render() {
    return (
      <div>Pins: {this.props.pins} </div>
    );
  }

}

export default BowlingLane;