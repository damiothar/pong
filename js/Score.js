import { flash } from './helpers.js';

export default class Score {
	constructor(audio) {
		this.audio = audio;

		this.playerEl = document.querySelector('.score__number.--player');
		this.computerEl = document.querySelector('.score__number.--computer');

		this.reset();
	}
	reset() {
		this.player = 0;
		this.computer = 0;
		this.playerEl.textContent = this.player;
		this.computerEl.textContent = this.computer;
	}
	pointPlayer() {
		this.player++;
		this.playerEl.textContent = this.player;
		flash(this.playerEl);
		this.audio.point();
		this.audio.win();
	}
	pointComputer() {
		this.computer++;
		this.computerEl.textContent = this.computer;
		flash(this.computerEl);
		this.audio.point();
		this.audio.lose();
	}
}
