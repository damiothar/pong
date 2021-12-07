import 'https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js';
import { randomIntBetween } from './helpers.js';

export default class Audio {
	constructor() {
		this.hitWallSound = [];
		for (let i = 0; i < 3; i++) {
			this.hitWallSound[i] = new Howl({
				src: [`./audio/collapse-wall-${i}.mp3`],
			});
		}

		this.hitPaddleSound = new Howl({
			src: [`./audio/collapse-paddle.mp3`],
		});

		this.pointSound = new Howl({
			src: [`./audio/point.mp3`],
			volume: 0.5,
		});

		this.winSound = [];
		for (let i = 0; i < 2; i++) {
			this.winSound[i] = new Howl({
				src: [`./audio/win-${i}.mp3`],
			});
		}

		this.loseSound = [];
		for (let i = 0; i < 4; i++) {
			this.loseSound[i] = new Howl({
				src: [`./audio/lose-${i}.mp3`],
			});
		}
	}

	hitWall() {
		const random = randomIntBetween(0, this.hitWallSound.length - 1);
		this.hitWallSound[random].play();
	}

	hitPaddle() {
		this.hitPaddleSound.play();
	}

	point() {
		this.pointSound.play();
	}

	win() {
		const random = randomIntBetween(0, this.winSound.length - 1);
		console.log(random);
		this.winSound[random].play();
	}

	lose() {
		const random = randomIntBetween(0, this.loseSound.length - 1);
		this.loseSound[random].play();
	}
}
