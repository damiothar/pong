export const randomNumbBettween = (min, max) => {
	return Math.random() * (max - min) + min;
};

export const randomIntBetween = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const isCollision = (rect1, rect2) => {
	return (
		rect1.left <= rect2.right &&
		rect1.right >= rect2.left &&
		rect1.top <= rect2.bottom &&
		rect1.bottom >= rect2.top
	);
};

export const changeHue = (hue) => {
	const html = document.documentElement;
	html.style.setProperty('--hue', hue);
};

export const flash = (el, custom = false) => {
	el.classList.add('--flash');
	if (custom) el.classList.add(`--${custom}`);
	setTimeout(() => {
		el.classList.remove('--flash');
		if (custom) el.classList.remove(`--${custom}`);
	}, 100);
};
