'use strict';

/*functionality
1. rolling die
    generating value    
    switching the picture based on rolled number
2. adding die roll to score if not 1
2. losing score if roll is 1
3. if roll is 1, switch players
4. if hold, add to score and switch players
5. win >=100
6. new game will reset everything
*/

//adding elements
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//variables
let currScore = 0;
let player = 0;
let winner = -1;

//initial conditions
reset();

//helper functions

function setScore(score, player) {
  document.querySelector(`#score--${player}`).textContent = score;
}

function addScore(score, player) {
  document.querySelector(`#score--${player}`).textContent =
    Number(document.querySelector(`#score--${player}`).textContent) + score;
}

function setCurrScore() {
  document.querySelector(`#current--${player}`).textContent = currScore;
}

function switchPlayer() {
  player = player === 1 ? 0 : 1;
  document.querySelector(`.player--1`).classList.toggle('player--active');
  document.querySelector(`.player--0`).classList.toggle('player--active');
}

function clearCurrScore() {
  currScore = 0;
  setCurrScore();
}

function clearScores() {
  setScore(0, 0);
  setScore(0, 1);
}

function reset() {
  clearScores();
  diceEl.classList.add('hidden');
  if (winner > -1) {
    document
      .querySelector('.player--winner')
      .classList.remove('player--winner');
    document.querySelector(`#name--${winner}`).textContent = `PLAYER ${
      winner + 1
    }`;
    winner = -1;
  }
}

function checkWin() {
  if (Number(document.querySelector(`#score--${player}`).textContent) >= 100) {
    return true;
  } else return false;
}

function currPlayerWins() {
  document.querySelector(`#name--${player}`).textContent += ' wins!!';
  document.querySelector(`.player--${player}`).classList.add('player--winner');
  winner = player;
}

//buttons
btnRoll.addEventListener('click', function () {
  if (winner === -1) {
    //generate number 1-6
    const die = Math.trunc(Math.random() * 6) + 1;
    //display die
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${die}.png`;
    //check for rolled 1, if true switch to other player
    if (die !== 1) {
      //add die to current score
      currScore += die;
      setCurrScore();
    } else {
      //switch players and clear score
      clearCurrScore();
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (winner === -1) {
    addScore(currScore, player);
    clearCurrScore();
    if (checkWin()) {
      currPlayerWins();
    } else switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  clearCurrScore();
  player = 0;
  document.querySelector(`.player--active`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.add('player--active');
  reset();
});
