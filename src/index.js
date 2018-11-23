/* eslint-disable no-unused-vars */

import P5 from 'p5';

const width = window.innerWidth;
const height = window.innerHeight;

/**
 * Wrapper function for sketch
 * (also provides JS intellisense in Visual Studio Code)
 * @param {P5} sketch
 */
function renderer(sketch) {
	sketch.setup = () => {
		sketch.createCanvas(width, height);
	};

	sketch.draw = () => {
		sketch.background('#000');
	};
}

const myp5 = new P5(renderer, document.getElementById('root'));
