/// <reference path="../typings/index" />

import * as matrix from 'matrix';

export class Point extends matrix.Point {
	constructor (x: number, y: number) {
		super(x, y);
	}

	get x() {
		return this.coordinates[0];
	}

	get y() {
		return this.coordinates[1];
	}

	transform(t: Transformation): Point {
		let p = super.transform(t);
		let [x, y] = p.coordinates;

		return new Point(x, y);
	}
}

export class Vector extends matrix.Vector {
	constructor (x: number, y: number) {
		super(x, y);
	}

	static createFromPoints(end: Point, start?: Point): Vector {
		let v = super.createFromPoints(end, start);
		let [x, y] = v.coordinates;

		return new Vector(x, y);
	}

	get x() {
		return this.coordinates[0];
	}

	get y() {
		return this.coordinates[1];
	}

	multiply(m: matrix.Matrix): Vector {
		let v = super.multiply(m);
		let [x, y] = v.coordinates;

		return new Vector(x, y);
	}

	transform(t: Transformation): Vector {
		let v = super.transform(t);
		let [x, y] = v.coordinates;

		return new Vector(x, y);
	}

	opposite(): Vector {
		let v = super.opposite();
		let [x, y] = v.coordinates;

		return new Vector(x, y);
	}

	scale(value: number): Vector {
		let v = super.scale(value);
		let [x, y] = v.coordinates;

		return new Vector(x, y);
	}

	sum(vector: Vector): Vector {
		let v = super.sum(vector);
		let [x, y] = v.coordinates;

		return new Vector(x, y);
	}

	subtract(vector: Vector): Vector {
		let v = super.subtract(vector);
		let [x, y] = v.coordinates;

		return new Vector(x, y);
  }
}

export class Transformation extends matrix.Transformation {

	constructor(...vectors: matrix.Vector[]) {
		if (vectors.length == 0) {
			vectors.push(new matrix.Vector(1, 0, 0));
			vectors.push(new matrix.Vector(0, 1, 0));
			vectors.push(new matrix.Vector(0, 0, 1));
		}

		super(...vectors);
	}

	static createFromValues(
		a: number, b: number, c: number, d: number, e: number, f: number
	): Transformation {
		return new Transformation(
			new matrix.Vector(a, b, 0),
			new matrix.Vector(c, d, 0),
			new matrix.Vector(e, f, 1)
		);
	}

	transform(t: Transformation): Transformation {
		return new Transformation(...super.transform(t).vectors);
	}

	inverse(): Transformation {
		let t = super.inverse();

		return new Transformation(...t.vectors);
	}

	rotate(angle: number, center?: Point): Transformation {
		let ret: Transformation;
		let cos = Math.cos(angle);
		let sin = Math.sin(angle);

		if (center !== undefined) {
			let c = Vector.createFromPoints(center);

			ret = this.translate(c.opposite()).rotate(angle).translate(c);
		} else {
			ret = this.transform(new Transformation(
				new matrix.Vector(cos, sin, 0),
				new matrix.Vector(-sin, cos, 0),
				new matrix.Vector(0, 0, 1)
			));
		}

		return ret;
	}

	translate(v: Vector): Transformation {
		return this.transform(new Transformation(
			new matrix.Vector(1, 0, 0),
			new matrix.Vector(0, 1, 0),
			new matrix.Vector(v.x, v.y)
		));
	}

	scale(x: number, y?: number): Transformation {
		if (y === undefined) {
			y = x;
		}

		return this.transform(new Transformation(
			new matrix.Vector(x, 0, 0),
			new matrix.Vector(0, y, 0),
			new matrix.Vector(0, 0, 0)
		));
	}

	skewX(angle: number): Transformation {
		return this.transform(new Transformation(
			new matrix.Vector(1, 0, 0),
			new matrix.Vector(Math.tan(angle), 1, 0),
			new matrix.Vector(0, 0, 0)
		));
	}

	skewY(angle: number): Transformation {
		return this.transform(new Transformation(
			new matrix.Vector(1, Math.tan(angle), 0),
			new matrix.Vector(0, 1, 0),
			new matrix.Vector(0, 0, 0)
		));
	}
}
