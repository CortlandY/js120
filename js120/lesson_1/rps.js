// Constants //
const readline = require('readline-sync');

// Utility Functions //
function prompt(string) {
  console.log(`=> ${string}\n`);
}

function capitalize(str) {
  return (str[0]).toUpperCase() + str.slice(1).toLowerCase();
}

const RPSGame = {
  CHOICES: {
    rock: {shorthand: 'r', beats: ['scissors']},
    paper: {shorthand: 'p', beats: ['rock']},
    scissors: {shorthand: 'sc', beats: ['paper']},
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

    prompt(`Thanks for playing ${gameName} Goodbye!`);
  },

  displayScore() {
    console.log(`You: ${this.human.score}\nComputer: ${this.computer.score}`);
  },

  determineWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    console.log(Object.entries(this.CHOICES));

    if (this.CHOICES[humanMove][this.beats] === computerMove) {
      this.roundWinner = 'human';
    } else if (humanMove === computerMove) {
      this.roundWinner = 'tie';
    } else this.roundWinner = 'computer';
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

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

  playAgain() {
    console.log(`Would you like to play again? (y/n)\n`);
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.determineWinner();
      this.displayWinner();
      this.displayScore();
      if (!this.playAgain()) break;
    }
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