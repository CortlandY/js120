/* eslint-disable max-len */
// Constants //
const readline = require('readline-sync');

// Utility Functions //
function prompt(string) {
  console.log(`=> ${string}\n`);
}

/*
function capitalize(str) {
  return (str[0]).toUpperCase() + str.slice(1).toLowerCase();
}
*/

const RPSGame = {
  CHOICES: {
    rock: ['scissors'],
    paper: ['rock'],
    scissors: ['paper'],
  },
  WIN_CONDITION: 5,
  roundWinner: null,
  gameWinner: null,
  history: [],

  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.clear();
    const gameName = Object.keys(this.CHOICES).join(', ');

    prompt(`Welcome to ${gameName}!`);
    prompt(`First to ${this.WIN_CONDITION} wins will be crowned grand champion!`);
  },

  displayGoodbyeMessage() {
    const gameName = Object.keys(this.CHOICES).join(', ');

    prompt(`Thanks for playing ${gameName}. Goodbye!`);
  },

  updateScore(roundWinner) {
    if (roundWinner === 'human') {
      this.human.score += 1;
    } else if (roundWinner === 'computer') {
      this.computer.score += 1;
    }
  },

  displayScore() {
    console.log(`You: ${this.human.score}    |    Computer: ${this.computer.score}\n`);
  },

  determineWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if (this.CHOICES[humanMove].includes(computerMove)) {
      this.roundWinner = 'human';
    } else if (humanMove === computerMove) {
      this.roundWinner = 'tie';
    } else this.roundWinner = 'computer';
  },

  displayWinner() {

    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}\n`);

    if (this.roundWinner === 'tie') {
      prompt('It\'s a tie this round!');
    } else {
      prompt (`${this.roundWinner} wins this round!`);
    }
    /*if ((humanMove === 'rock' && computerMove === 'scissors') ||
    (humanMove === 'paper' && computerMove === 'rock') ||
    (humanMove === 'scissors' && computerMove === 'paper')) {
      console.log('You win!');
    } else if ((humanMove === 'rock' && computerMove === 'paper') ||
           (humanMove === 'paper' && computerMove === 'scissors') ||
           (humanMove === 'scissors' && computerMove === 'rock')) {
      console.log('Computer wins!');
    } else {
      console.log("It's a tie");
    }*/
  },

  displayResult() {
    if (this.human.score === this.WIN_CONDITION) {
      prompt(`User is crowned grand champion with by a score of User: ${this.human.score} vs. Computer: ${this.computer.score}`);
    } else if (this.computer.score === this.WIN_CONDITION) {
      prompt(`Computer is crowned grand champion with by a score of Computer: ${this.computer.score} vs. User: ${this.human.score}`);
    } else {
      prompt(`User resigned with a score of User: ${this.human.score} vs. Computer: ${this.computer.score}`);
    }
  },

  logHistory() {
    let entry = {
      human: this.human.move,
      computer: this.computer.move,
      winner: this.roundWinner
    };
    this.history.push(entry);
  },

  displayHistory() {
    const NUM_PREVIOUS = 5;

    if (this.history.length > 0) {
      console.log(`Previous results (last ${NUM_PREVIOUS} rounds):`);

      for (let index = 1; index <= NUM_PREVIOUS; index++) {
        const prevEntry = this.history.at(-index);
        if (prevEntry) {
          const { human, computer, winner } = prevEntry;

          console.log(`You: ${human} | Computer: ${computer} | Winner: ${winner === 'human' ? 'you' : winner}`);
        } else break;
      }
      console.log('-------------------------------------------------\n');
    }
  },

  playAgain() {
    console.log(`Would you like to play again? (y/n)\n`);
    let answer = readline.question();
    console.clear();
    return answer.toLowerCase()[0] === 'y';
  },

  displayGameInfo() {
    console.clear();
    this.displayScore();
    this.displayHistory();
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();

      this.determineWinner();
      this.displayWinner();

      this.updateScore(this.roundWinner);
      this.logHistory();

      if ((this.human.score === this.WIN_CONDITION)
      || (this.computer.score === this.WIN_CONDITION)
      || (!this.playAgain())) break;

      this.displayGameInfo();
    }
    console.clear();
    this.displayResult();
    this.displayGoodbyeMessage();
  },
};

function createPlayer() {
  return {
    move: null,
    score: 0,
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      const choices = ['rock', 'paper', 'scissors'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('Please choose rock, paper, or scissors:');
        choice = readline.question();
        if (['rock', 'paper', 'scissors'].includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}

RPSGame.play();