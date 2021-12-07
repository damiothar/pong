import {
	randomNumbBettween,
	randomIntBetween,
	isCollision,
	changeHue,
	flash,
} from './helpers.js';

const INITIAL_VELOCITY = 0.03;
const VELOCITY_INCREACE = 0.00001;

export default class Ball {
	constructor(audio) {
		this.audio = audio;

		this.ballEl = document.querySelector('.ball');
		this.reset();
	}

	get x() {
		return parseFloat(getComputedStyle(this.ballEl).getPropertyValue('--x'));
	}
	set x(value) {
		this.ballEl.style.setProperty('--x', value);
	}

	get y() {
		return parseFloat(getComputedStyle(this.ballEl).getPropertyValue('--y'));
	}
	set y(value) {
		this.ballEl.style.setProperty('--y', value);
	}

	rect() {
		return this.ballEl.getBoundingClientRect();
	}

	move() {
		this.isMoving = true;
		this.ballEl.classList.add('--moving');
		document.body.classList.add('--moving');
	}

	stop() {
		this.isMoving = false;
		this.ballEl.classList.remove('--moving');
		document.body.classList.remove('--moving');
	}

	reset() {
		this.stop();
		this.ballEl.classList.remove('--hit');

		this.x = 50;
		this.y = 50;
		this.direction = { x: 0 };

		while (
			Math.abs(this.direction.x) <= 0.2 ||
			Math.abs(this.direction.x) >= 0.9
		) {
			const heading = randomNumbBettween(0, 2 * Math.PI);
			this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
		}
		this.velocity = INITIAL_VELOCITY;
	}

	update(delta, paddles) {
		this.x += this.direction.x * this.velocity * delta;
		this.y += this.direction.y * this.velocity * delta;
		this.velocity += VELOCITY_INCREACE * delta;

		//# HIT WALL
		const hitWall =
			this.rect().bottom >= window.innerHeight || this.rect().top <= 0;

		if (hitWall) {
			this.direction.y *= -1;

			this.audio.hitWall();
			flash(this.ballEl);

			// const random = randomIntBetween(0, 360);
			// changeHue(random);
		}
		//# HIT PADDLE
		const hitPaddle = paddles.some((paddle) => {
			return paddle.canHit && isCollision(paddle.rect(), this.rect());
		});
		if (hitPaddle) {
			this.direction.x *= -1;

			this.audio.hitPaddle();
			flash(this.ballEl);

			const random = randomIntBetween(0, 360);
			changeHue(random);
		}
	}
}
