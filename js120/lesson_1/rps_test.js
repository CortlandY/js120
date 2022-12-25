const rl = require('readline-sync');

// Utility Functions
function prompt(msg) {
  console.log(`=> ${msg}`);
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

const logSpace = function (lines = 1) {
  for (let counter = 1; counter <= lines; counter++) {
    console.log('');
  }
};

// Object Factory Functions
function createPlayer() {
  return {
    move: null,
    score: 0
  };
}

// eslint-disable-next-line max-lines-per-function
function createComputer() {
  const player = createPlayer();

  const computer = {
    weights: {},
    STARTING_WEIGHT: 10,
    ADJUST_WEIGHT_AMOUNT: 1,

    resetWeights(gameChoices) {
      const choices = Object.values(gameChoices);

      choices.forEach(choice => {
        this.weights[choice] = this.STARTING_WEIGHT;
      });
    },

    adjustWeights(winner) {
      if (winner === 'human') {
        this.weights[this.move] -= this.ADJUST_WEIGHT_AMOUNT;
      }
    },

    choose() {
      const totalWeight = Object.values(this.weights)
        .reduce((acc, sum) => acc + sum, 0);

      const randThreshold = Math.random() * totalWeight;

      let total = 0;
      const entries = Object.entries(this.weights);

      for (let idx = 0; idx < entries.length; idx++) {
        const [ choice, weight ] = entries[idx];
        total += weight;

        if (randThreshold <= total) {
          this.move = choice;
          return;
        }
      }
    },

    displayChoice() {
      console.log(`Computer chose: ${this.move}`);
    }
  };

  return Object.assign(player, computer);
}

// eslint-disable-next-line max-lines-per-function
function createHuman() {
  const player = createPlayer();

  const human = {
    choose(gameChoices) {
      let choicesAbbrev = Object.keys(gameChoices);
      let choicesFull = Object.values(gameChoices);
      let choicesArr = Object.entries(gameChoices);

      let choicesStr = '';
      choicesArr.forEach(([abbrev, choice]) => {
        choicesStr += `${choice} (${abbrev}), `;
      });
      choicesStr = choicesStr.slice(0, -2);

      prompt(`Choose one of the following:\n${choicesStr}`);
      let choice = rl.question().toLowerCase();

      while (!choicesAbbrev.includes(choice) && !choicesFull.includes(choice)) {
        prompt(`That's not a valid choice. Choose one of the following:\n${choicesStr}`);
        choice = rl.question().toLowerCase();
      }

      if (choicesAbbrev.includes(choice)) {
        choice = gameChoices[choice];
      }

      this.move = choice;
    },

    displayChoice() {
      console.log(`You chose: ${this.move}`);
    }
  };

  return Object.assign(player, human);
}

const RPSGame = {
  CHOICES: {
    r: 'rock',
    p: 'paper',
    sc: 'scissors',
    l: 'lizard',
    sp: 'spock'
  },
  WINNING_COMBOS: {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['spock', 'paper'],
    spock: ['scissors', 'rock']
  },
  human: createHuman(),
  computer: createComputer(),
  NUM_ROUNDS: 5,
  roundWinner: null,
  gameWinner: null,
  history: [],

  displayWelcomeMessage() {
    console.clear();

    const gameName = Object.values(this.CHOICES).map(capitalize).join(', ');

    prompt(`Welcome to ${gameName}!`);
    prompt(`First to win ${this.NUM_ROUNDS} rounds wins the game`);
    console.log('------------------------------------------------------');
    prompt('Press Enter to begin...');
    rl.question();
  },

  displayGoodbyeMessage() {
    prompt('Thanks for playing Rock, Paper, Scissors!');
  },

  displayScore() {
    console.log(`You: ${this.human.score} | Computer: ${this.computer.score}`);
    logSpace();
  },

  displayGameInfo() {
    console.clear();
    this.displayScore();
    this.displayHistory();
  },

  chooseMoves(choices) {
    this.human.choose(choices);
    this.computer.choose();
  },

  displayChoices() {
    console.clear();
    this.human.displayChoice();
    this.computer.displayChoice();
  },

  processRoundWinner() {
    this.calcRoundWinner();
    this.updateScore();
    this.addHistory();

    this.displayRoundWinner();
    logSpace();
    this.displayScore();
  },

  calcRoundWinner() {
    const humanChoice = this.human.move;
    const computerChoice = this.computer.move;

    if (this.WINNING_COMBOS[humanChoice].includes(computerChoice)) {
      this.roundWinner = 'human';
    } else if (humanChoice === computerChoice) {
      this.roundWinner = 'tie';
    } else {
      this.roundWinner = 'computer';
    }
  },

  displayRoundWinner() {
    logSpace();

    if (this.roundWinner === 'human') {
      prompt('You win this round!');
    } else if (this.roundWinner === 'computer') {
      prompt('Computer wins this round!');
    } else {
      prompt('This round is a tie.');
    }
  },

  updateScore() {
    if (this.roundWinner === 'human') {
      this.human.score += 1;
    } else if (this.roundWinner === 'computer') {
      this.computer.score += 1;
    }
  },

  addHistory() {
    const entry = {
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

      for (let idx = 1; idx <= NUM_PREVIOUS; idx++) {
        const prevEntry = this.history.at(-idx);
        if (prevEntry) {
          const { human, computer, winner } = prevEntry;

          console.log(`You: ${human} | Computer: ${computer} | Winner: ${winner === 'human' ? 'you' : winner}`);
        } else break;
      }

      console.log('--------------------------------------------------------');
      logSpace();
    }
  },

  gameWasWon() {
    return this.human.score >= this.NUM_ROUNDS ||
      this.computer.score >= this.NUM_ROUNDS;
  },

  calcGameWinner() {
    if (this.human.score >= this.NUM_ROUNDS) {
      this.gameWinner = 'human';
    } else {
      this.gameWinner = 'computer';
    }
  },

  displayGameWinner() {
    if (this.gameWinner === 'human') {
      prompt('You win!');
    } else {
      prompt('Computer wins!');
    }
  },

  playAgain() {
    logSpace();
    console.log('Play again? y or n');
    let response = rl.question().toLowerCase();

    while (!['y', 'n', 'yes', 'no'].includes(response)) {
      console.log('Please enter y or n');
      response = rl.question().toLowerCase();
    }

    return ['y', 'yes'].includes(response);
  },

  resetGame() {
    this.roundWinner = null;
    this.gameWinner = null;
    this.human.score = 0;
    this.computer.score = 0;
    this.history = [];
  },

  playGame() {
    while (true) {
      this.displayGameInfo();
      this.chooseMoves(this.CHOICES);
      this.displayChoices();
      this.processRoundWinner();

      if (this.gameWasWon()) break;

      this.computer.adjustWeights(this.roundWinner);

      prompt('Press Enter to play next round');
      rl.question();
    }
  },

  play() {
    this.displayWelcomeMessage();

    while (true) {
      this.computer.resetWeights(this.CHOICES);
      this.playGame();
      this.calcGameWinner();
      this.displayGameWinner();

      if (!this.playAgain()) break;
      else {
        this.resetGame();
      }
    }

    this.displayGoodbyeMessage();
  }
};

RPSGame.play();