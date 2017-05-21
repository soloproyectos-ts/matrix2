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
	constructor(v0: Vector, v1: Vector, v2: Vector) {
		super(v0, v1, v2);
	}
}
