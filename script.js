'use strict';

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const score1 = document.getElementById('score--0');
const score2 = document.getElementById('score--1');
const currentScore1 = document.getElementById('current--0');
const currentScore2 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const play = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
let scores, playing, activePlayer, currentScore;

// Starting conditions
const resetGame = function () {
  scores = [0, 0];
  playing = true;
  activePlayer = 0;
  currentScore = 0;
  score1.textContent = 0;
  score2.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
  dice.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
};
resetGame();

const togglePlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

//Play game
play.addEventListener('click', function () {
  if (playing) {
    const roll = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `images/dice-${roll}.png`;
    if (roll !== 1) {
      currentScore += roll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      togglePlayer();
    }
  }
});

//Hold scores
hold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 30) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dice.classList.add('hidden');
    } else {
      togglePlayer();
    }
  }
});

newGame.addEventListener('click', resetGame);

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModal = document.querySelector('.close-modal');
const showModal = document.querySelectorAll('.show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const hideModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < showModal.length; i++) {
  showModal[i].addEventListener('click', openModal);
}

closeModal.addEventListener('click', hideModal);
overlay.addEventListener('click', hideModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    hideModal();
  }
});
