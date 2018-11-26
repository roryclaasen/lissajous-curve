/* eslint-disable no-unused-vars */

import P5 from 'p5';
import Stats from 'stats-js';
import { GUI } from 'dat.gui';

import Curve from './curve';

const width = window.innerWidth;
const height = window.innerHeight;

const stats = new Stats();
stats.setMode(0);
document.getElementById('root').appendChild(stats.domElement);

const options = {
	size: 120,
	speed: 1,
	appearance: {
		color: '#fff',
		background: '#000',
		lines: true,
		point: true,
		pointWeight: 6
	}
};

const noX = () => Math.floor(width / options.size) - 1;
const noY = () => Math.floor(height / options.size) - 1;

let angle = 0;
const curves = [];
function makeCurves() {
	for (let x = 0; x < noX(); x += 1) {
		curves[x] = [];
		for (let y = 0; y < noY(); y += 1) {
			curves[x][y] = new Curve();
		}
	}
	angle = 0;
}

const gui = new GUI();
gui.add(options, 'size', 10, 300).onChange((value) => { makeCurves(); });
gui.add(options, 'speed', 1, 100, 1);

const appearance = gui.addFolder('appearance');
appearance.addColor(options.appearance, 'color');
appearance.addColor(options.appearance, 'background');
appearance.add(options.appearance, 'lines');
appearance.add(options.appearance, 'point');
appearance.add(options.appearance, 'pointWeight', 1, 20, 1);

/**
 * @param {P5} sketch
 * @param {string} axis
 */
function drawSides(sketch, axis) {
	const d = options.size - 0.2 * options.size;
	const r = d / 2;

	const length = axis === 'x' ? noX() : noY();

	sketch.push();
	sketch.noFill();
	for (let i = 0; i < length; i += 1) {
		let cx = options.size + i * options.size + options.size / 2;
		let cy = options.size / 2;
		if (axis === 'y') {
			cx = options.size / 2;
			cy = options.size + i * options.size + options.size / 2;
		}

		sketch.strokeWeight(1);
		sketch.stroke(options.appearance.color);
		sketch.ellipse(cx, cy, d, d);

		const pos = new P5.Vector(
			r * Math.cos(angle * (i + 1) - sketch.HALF_PI),
			r * Math.sin(angle * (i + 1) - sketch.HALF_PI)
		);

		sketch.strokeWeight(options.appearance.pointWeight);
		sketch.stroke(options.appearance.color);
		sketch.point(cx + pos.x, cy + pos.y);

		if (options.appearance.lines) {
			const color = sketch.color(options.appearance.color);
			color.setAlpha(100);
			sketch.stroke(color);
			sketch.strokeWeight(1);
			if (axis === 'x') sketch.line(cx + pos.x, 0, cx + pos.x, height);
			if (axis === 'y') sketch.line(0, cy + pos.y, width, cy + pos.y);
		}

		if (axis === 'x') {
			for (let y = 0; y < noY(); y += 1) {
				curves[i][y].x = cx + pos.x;
			}
		}
		if (axis === 'y') {
			for (let x = 0; x < noX(); x += 1) {
				curves[x][i].y = cy + pos.y;
			}
		}
	}
	sketch.pop();
}

/**
 * Wrapper function for sketch
 * (also provides JS intellisense in Visual Studio Code)
 * @param {P5} sketch
 */
function renderer(sketch) {
	makeCurves();

	sketch.setup = () => {
		sketch.createCanvas(width, height);
	};

	sketch.draw = () => {
		stats.begin();
		sketch.background(options.appearance.background);

		drawSides(sketch, 'x');
		drawSides(sketch, 'y');

		for (let x = 0; x < noX(); x += 1) {
			for (let y = 0; y < noY(); y += 1) {
				curves[x][y].pushCurrent();
				curves[x][y].draw(sketch, options);
			}
		}

		angle -= options.speed / 1000;
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

const myp5 = new P5(renderer, document.getElementById('root'));
