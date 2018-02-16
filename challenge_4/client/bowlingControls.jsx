import React from 'react';
import _ from 'lodash';

class BowlingControls extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="bowlingControls">
        {_.map(['0','1','2','3','4','5','6','7','8','9','10'], (num, i) => {
          return (
            <button class="controlbutton" onClick={()=>(this.props.onThrow(i))} >{num}</button >
          );
        })}
      </div>
    );
  }
}

export default BowlingControls;