import { flash } from './helpers.js';
import Audio from './Audio.js';
import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Score from './Score.js';

const audio = new Audio();

const score = new Score(audio);
let winAtScore = 9;

const ball = new Ball(audio);
const paddlePlayer = new Paddle(document.querySelector('.paddle.--player'));
const paddleComputer = new Paddle(document.querySelector('.paddle.--computer'));

let isFinished = false;
const finish = (winner) => {
	isFinished = true;
	document.body.classList.add('--finished');
	if (winner === 'player') document.body.classList.add('--win');
	else document.body.classList.add('--lose');
};
const start = () => {
	isFinished = false;
	document.body.classList.remove('--finished');
	document.body.classList.remove('--win');
	document.body.classList.remove('--lose');
	score.reset();
	paddlePlayer.resetSize();
	paddleComputer.resetSize();
};
const play = () => {
	if (isFinished) start();
	ball.move();
};

//# MOUSE CONTROLS
const startButton = document.querySelector('.startButton');
startButton.addEventListener('click', play);

window.addEventListener('mousemove', (e) => {
	paddlePlayer.position = (e.y / window.innerHeight) * 100;
});

//# IS POINT
const isPoint = () => {
	const rect = ball.rect();
	return rect.right >= window.innerWidth || rect.left <= 0;
};

//# HANDLE POINT
const handlePoint = () => {
	// Player
	if (ball.rect().right >= window.innerWidth) {
		score.pointPlayer();
		paddlePlayer.shrink();
		flash(document.body, 'player');
	}
	// Computer
	else {
		score.pointComputer();
		paddleComputer.shrink();
		flash(document.body, 'computer');
	}

	if (score.player === winAtScore) finish('player');
	if (score.computer === winAtScore) finish('computer');

	ball.reset();
	paddleComputer.resetPosition();
};

//# ANIMATION
let lastTime;
const update = (time) => {
	if (lastTime != null) {
		const delta = time - lastTime;
		if (ball.isMoving) {
			ball.update(delta, [paddlePlayer, paddleComputer]);
			paddlePlayer.update(null, ball);
			paddleComputer.update(delta, ball);
			if (isPoint()) handlePoint();
		}
	}
	lastTime = time;
	window.requestAnimationFrame(update);
};
window.requestAnimationFrame(update);
