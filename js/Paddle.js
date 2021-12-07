import { isCollision, flash } from './helpers.js';

const SPEED = 0.01;

export default class Paddle {
	constructor(paddleEl) {
		this.paddleEl = paddleEl;
		this.canHit = true;
		this.resetPosition();
		this.resetSize();
	}

	get position() {
		return parseFloat(
			getComputedStyle(this.paddleEl).getPropertyValue('--position')
		);
	}
	set position(value) {
		this.paddleEl.style.setProperty('--position', value);
	}
	resetPosition() {
		this.position = 50;
	}

	get size() {
		return parseFloat(
			getComputedStyle(this.paddleEl).getPropertyValue('--size')
		);
	}
	set size(value) {
		this.paddleEl.style.setProperty('--size', value);
	}
	resetSize() {
		this.size = 16;
	}

	rect() {
		return this.paddleEl.getBoundingClientRect();
	}

	shrink() {
		if (this.size > 6) this.size -= 1;
	}

	update(delta, ball) {
		this.position += SPEED * delta * (ball.y - this.position);

		const hitBall = isCollision(ball.rect(), this.rect());
		if (hitBall) {
			this.canHit = false;
			setTimeout(() => {
				this.canHit = true;
			}, 100);
			flash(this.paddleEl);
		}
	}
}
