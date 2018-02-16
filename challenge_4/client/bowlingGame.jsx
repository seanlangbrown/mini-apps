import React from 'react';
import _ from 'lodash';
import ScoreBoard from './scoreBoard.jsx';
import BowlingLane from './bowlingLane.jsx';
import BowlingControls from './bowlingControls.jsx';
import axios from 'axios';

class BowlingGame extends React.Component {
	
  constructor() {
    super()
    this.bowl = this.bowl.bind(this);
    this.state = {
      pinsStanding: 10,
      turn: 1,
      ballThrow: 1,
      score: 0,
      scoreCard: []
    }
  }

  bowl(pinsHit) {
    if(pinsHit <= this.state.pinsStanding && this.state.turn) {
      let pinsLeft = this.state.pinsStanding - pinsHit;
      let [newScore, updatedScoreCard] = this.score(pinsHit);
      let [nextThrow, nextTurn] = this.nextThrow(pinsLeft);
      if(nextThrow === 1) {
        pinsLeft = 10;
      }
      this.setState({
        pinsStanding: pinsLeft,
        turn: nextTurn,
        ballThrow: nextThrow,
        score: newScore,
        scoreCard: updatedScoreCard,
      });
    }
  }

  score(pinsHit) {
    let score = this.state.score;
    let scoreCard = this.state.scoreCard.slice();
    if (pinsHit === 10 && this.state.ballThrow === 1) {
      //strike
      console.log('strike');
      score += 10;
      scoreCard.push(['X', null]);
    } else if (this.state.pinsStanding - pinsHit === 0) {
      //spare
      score += pinsHit;
      scoreCard[this.state.turn - 1].push('/');
    } else {
      if(this.state.ballThrow === 1) {
        scoreCard.push([pinsHit]);
      } else {
        scoreCard[this.state.turn - 1].push(pinsHit);
      }
      score += pinsHit;
    }
    if (this.isLastTurnSpecial() === 'strike') {
      score += pinsHit;
    }
    if (this.state.ballThrow === 1 && this.isLastTurnSpecial() === 'spare') {
      score += pinsHit;
    }
    console.log('scorecard in scorer', scoreCard);
    return [score, scoreCard];
  }

  isLastTurnSpecial() {
    if(this.state.turn === 1) {
      return false;
    }
    let lastTurn = this.state.scoreCard[this.state.turn - 2];
    console.log('turn num', this.state.turn);
    console.log('scoreCard state', this.state.scoreCard);
    console.log('lastTurn', lastTurn);
    if(lastTurn[0] === 'X') {
      return 'strike';
    }
    if(lastTurn[1] === '/') {
      return 'spare';
    }
    return false;
  }

  nextThrow(pinsLeft) {
      if (this.state.ballThrow === 2 || (this.state.ballThrow === 1 && pinsLeft === 0)) {
        if (this.state.turn < 10 || pinsLeft === 0) {
          return [1, this.state.turn + 1];
        } else if (this.state.turn > 9) {
          this.postScore();
          return [null, null];
        }
      } else {
        if (this.state.turn < 11 || this.isLastTurnSpecial() === 'strike') {
          return [2, this.state.turn];
        } else {
          this.postScore();
          return [null, null];
        }
      }

  }

  postScore() {
    console.log('posting score:', this.state.score);
    axios.post('/scores', {
      name: 'Pro Bowler',
      score: this.state.score
    })
    .then(function (response) {
      console.log(response);
    })
    .then(this.getScore())
    .catch(function (error) {
      console.log(error);
    });

  }

  getScore() {
    console.log('getting score');
    axios.get('/scores')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }



	render () {


     return (
      <div class="bowlingGame">
         <h1>bowling app</h1> 
         <ScoreBoard score={this.state.score} turn={this.state.turn} ballThrow={this.state.ballThrow} />
         <BowlingLane pins={this.state.pinsStanding} />
         <BowlingControls onThrow={this.bowl} />
      </div>


     );


	}
}


export default BowlingGame;