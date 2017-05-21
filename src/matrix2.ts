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
		let ret: Transformation;
		let cos = Math.cos(angle);
		let sin = Math.sin(angle);

		if (center !== undefined) {
			ret = this.translate(center.opposite()).rotate(angle).translate(center);
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
			new matrix.Vector(0, 0)
		));
	}

	skewX(angle: number): Transformation {
		return this.transform(new Transformation(
			new matrix.Vector(1, 0, 0),
			new matrix.Vector(Math.tan(angle), 1, 0),
			new matrix.Vector(0, 0)
		));
	}

	skewY(angle: number): Transformation {
		return this.transform(new Transformation(
			new matrix.Vector(1, Math.tan(angle), 0),
			new matrix.Vector(0, 1, 0),
			new matrix.Vector(0, 0)
		));
	}
}
