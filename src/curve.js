import P5 from 'p5';

export default class Curve {
	constructor() {
		this.path = [];
		this.current = new P5.Vector();
	}

	set x(x) {
		this.current.x = x;
	}

	set y(y) {
		this.current.y = y;
	}

	pushCurrent() {
		this.path.push(this.current);
	}

	reset() {
		this.path = [];
	}

	/**
	 * @param {P5} sketch
	 * @param {*} options
	 * @memberof Curve
	 */
	draw(sketch, options) {
		sketch.stroke(options.color);
		sketch.strokeWeight(1);
		sketch.noFill();
		sketch.beginShape();
		for (const v of this.path) {
			sketch.vertex(v.x, v.y);
		}
		sketch.endShape();
		
		if (options.point) {
			sketch.strokeWeight(8);
			sketch.point(this.current.x, this.current.y);
		}
		this.current = new P5.Vector();
	}
}
