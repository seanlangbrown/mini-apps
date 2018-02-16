import React from 'react';
import _ from 'lodash';


class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

   return(
    <div class="scoreboard">
      <div id="score">Score: {this.props.score}</div>
      <div id="turn">Turn: {this.props.turn}</div>
      <div id="throw">Throw: {this.props.ballThrow}</div>
    </div>

   );

  }
}

export default ScoreBoard;