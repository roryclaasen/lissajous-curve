/* eslint-disable no-unused-vars */

import P5 from 'p5';
import Stats from 'stats-js';
import { GUI } from 'dat.gui';

import Curve from './curve';

const width = window.innerWidth;
const height = window.innerHeight;

const options = {
	width: 120,
	color: '#fff',
	background: '#000',
	lines: true,
	point: true
};

const noX = () => Math.floor(width / options.width) - 1;
const noY = () => Math.floor(height / options.width) - 1;

const stats = new Stats();
stats.setMode(1);

const gui = new GUI();
// gui.add(options, 'width', 1, 300);
gui.addColor(options, 'color');
gui.addColor(options, 'background');
gui.add(options, 'lines');
gui.add(options, 'point');

/**
 * Wrapper function for sketch
 * (also provides JS intellisense in Visual Studio Code)
 * @param {P5} sketch
 */
function renderer(sketch) {
	const curves = [];
	for (let x = 0; x < noX(); x += 1) {
		curves[x] = [];
		for (let y = 0; y < noY(); y += 1) {
			curves[x][y] = new Curve();
		}
	}
	let angle = 0;

	sketch.setup = () => {
		sketch.createCanvas(width, height);
	};

	sketch.draw = () => {
		stats.begin();
		sketch.background(options.background);

		const d = options.width - 0.2 * options.width;
		const r = d / 2;

		sketch.noFill();
		sketch.stroke(255);
		for (let i = 0; i < noX(); i += 1) {
			const cx = options.width + i * options.width + options.width / 2;
			const cy = options.width / 2;
			sketch.strokeWeight(1);
			sketch.stroke(options.color);
			sketch.ellipse(cx, cy, d, d);
			const x = r * Math.cos(angle * (i + 1) - sketch.HALF_PI);
			const y = r * Math.sin(angle * (i + 1) - sketch.HALF_PI);

			if (options.point) {
				sketch.strokeWeight(8);
				sketch.stroke(options.color);
				sketch.point(cx + x, cy + y);
			}

			if (options.lines) {
				sketch.stroke(255, 150);
				sketch.strokeWeight(1);
				sketch.line(cx + x, 0, cx + x, height);
			}

			for (let j = 0; j < noY(); j += 1) {
				curves[i][j].x = cx + x;
			}
		}

		sketch.noFill();
		sketch.stroke(255);
		for (let j = 0; j < noY(); j += 1) {
			const cx = options.width / 2;
			const cy = options.width + j * options.width + options.width / 2;
			sketch.strokeWeight(1);
			sketch.stroke(options.color);
			sketch.ellipse(cx, cy, d, d);
			const x = r * Math.cos(angle * (j + 1) - sketch.HALF_PI);
			const y = r * Math.sin(angle * (j + 1) - sketch.HALF_PI);

			if (options.point) {
				sketch.strokeWeight(8);
				sketch.stroke(options.color);
				sketch.point(cx + x, cy + y);
			}

			if (options.lines) {
				sketch.stroke(255, 150);
				sketch.strokeWeight(1);
				sketch.line(0, cy + y, width, cy + y);
			}

			for (let i = 0; i < noX(); i += 1) {
				curves[i][j].y = cy + y;
			}
		}

		for (let x = 0; x < noX(); x += 1) {
			for (let y = 0; y < noY(); y += 1) {
				curves[x][y].pushCurrent();
				curves[x][y].draw(sketch, options);
			}
		}

		angle -= 0.01;
		if (angle < -sketch.TWO_PI) {
			angle = 0.0;
			for (let x = 0; x < noX(); x += 1) {
				for (let y = 0; y < noY(); y += 1) {
					curves[x][y].reset();
				}
			}
		}
		stats.end();
	};
}

document.getElementById('root').appendChild(stats.domElement);
const myp5 = new P5(renderer, document.getElementById('root'));
