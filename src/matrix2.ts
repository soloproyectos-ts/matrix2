/// <reference path="../typings/index" />

import * as matrix from 'matrix';

export {Matrix, SquareMatrix} from 'matrix';

export class Point extends matrix.Point {
	constructor(x: number, y: number)  {
		super(x, y);
	}

	get x(): number {
		return this.coordinates[0];
	}

	get y(): number {
		return this.coordinates[1];
	}

	transform(t: Transformation): Point {
		let [x, y] = super.transform(t).coordinates;

		return new Point(x, y);
	}
}

export class Vector extends matrix.Vector {
	constructor (x: number, y: number) {
		super(x, y);
	}

	get x(): number {
		return this.coordinates[0];
	}

	get y(): number {
		return this.coordinates[1];
	}

	multiply(m: matrix.Matrix): Vector {
		let [x, y] = super.multiply(m).coordinates;

		return new Vector(x, y);
	}

	transform(t: Transformation): Vector {
		let [x, y] = super.transform(t).coordinates;

		return new Vector(x, y);
	}

	opposite(): Vector {
		let [x, y] = super.opposite().coordinates;

		return new Vector(x, y);
	}

	scale(value: number): Vector {
		let [x, y] = super.scale(value).coordinates;

		return new Vector(x, y);
	}

	sum(vector: Vector): Vector {
		let [x, y] = super.sum(vector).coordinates;

		return new Vector(x, y);
	}

	subtract(vector: Vector): Vector {
		let [x, y] = super.subtract(vector).coordinates;

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

	static createFromValues(a: number, b: number, c: number, d: number, e: number, f: number): Transformation {
		return new Transformation(
			new matrix.Vector(a, b, 0),
			new matrix.Vector(c, d, 0),
			new matrix.Vector(e, f, 1)
		);
	}

	transform(t: Transformation): Transformation {
		return new Transformation(...super.transform(t).vectors);
	}

	rotate(angle: number, center?: Vector): Transformation {
		let t = new Transformation(
			new matrix.Vector(Math.cos(angle), Math.sin(angle), 0),
			new matrix.Vector(-Math.sin(angle), Math.cos(angle), 0),
			new matrix.Vector(0, 0, 1)
		);

		return new Transformation(...t.multiply(this).vectors);
	}

	translate(v: Vector): Transformation {
		return this;
	}

	scaleX(value: number): Transformation {
		return this;
	}

	scaleY(value: number): Transformation {
		return this;
	}

	skewX(angle: number): Transformation {
		return this;
	}

	skewY(angle: number): Transformation {
		return this;
	}
}
