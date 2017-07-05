/// <reference path="../typings/index" />

import * as matrix from 'matrix';

export interface Positionable extends matrix.Positionable {
	readonly x: number;
	readonly y: number;
}

export class Point extends matrix.Point implements Positionable {
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

export class Vector extends matrix.Vector implements Positionable {
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

export class Line {
	readonly origin: Point;
	readonly direction: Vector;

	constructor (origin: Point, direction: Vector) {
		this.origin = origin;
		this.direction = direction;
	}

	// Gets the parallel line that contains the point [p].
	getParallel(p: Point): Line {
		return new Line(p, this.direction);
	}

	// Gets the perpendicular line that contains the point [p].
	getPerpendicular(p: Point): Line {
		return new Line(p, new Vector(-this.direction.y, this.direction.x));
	}

	// Is the line [l] parallel to [this] line?
	isParallel(l: Line): boolean {
		let v0 = this.direction;
		let v1 = l.direction;

		return v0.x * v1.y == v1.x * v0.y;
	}

	// Gets the intersection between [this] line and the [l] line.
	getIntersection(l: Line): Point {
		let [p0, p1] = [this.origin, l.origin];
		let [v0, v1] = [this.direction, l.direction];
		let m = new matrix.SquareMatrix(v0, v1.opposite());
		let v = Vector.createFromPoints(p1, p0);
		let w = v.multiply(m.inverse());

		let t = new Transformation().translate(v0.scale(w.x));
		return p0.transform(t);
	}

	// Gets the tangent of the angle between [this] line and the [l] line.
	getTangent(l: Line): number {
		let [l0, l1] = [this, l];
		let [p0, p1] = [l0.origin, l1.origin];
		let l2 = l1.getPerpendicular(p0);
		let p2 = l1.getIntersection(l2);
		let c = l0.getIntersection(l1);
		let u0 = Vector.createFromPoints(p2, c).unit();
		let u1 = Vector.createFromPoints(p0, p2).unit();
		let v = Vector.createFromPoints(p0, c);
		let m = new matrix.SquareMatrix(u0, u1);
		let w = v.multiply(m.inverse());

		return w.y / w.x;
	}
}

export class Transformation extends matrix.Transformation {

	// TODO: remove vectors argument
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
			new matrix.Vector(v.x, v.y, 1)
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

	toString(): string {
		let [v0, v1, v2] = this.vectors;
		let [a, b] = v0.coordinates;
		let [c, d] = v1.coordinates;
		let [e, f] = v2.coordinates;

		return `matrix(${a} ${b} ${c} ${d} ${e} ${f})`;
	}
}

// Gets the angle of a 'positionable' object, like a point or a vector.
export function getAngle(p: Positionable): number {
	let ret = NaN;
	let [x, y] = [p.x, p.y];

	if (x > 0 && !(y < 0)) {
		// first quadrant
		ret = Math.atan(y / x);
	} else if (!(x > 0) && y > 0) {
		// second quadrant
		ret = x < 0
			? Math.atan(y / x) + Math.PI
			: Math.PI / 2;
	} else if (x < 0 && !(y > 0)) {
		// third quadrant
		ret = Math.atan(y / x) + Math.PI;
	} else if (!(x < 0) && y < 0) {
		// fourth quadrant
		ret = x > 0
			? Math.atan(y / x) + 2 * Math.PI
			: 3 * Math.PI / 2;
	}

	return ret;
}

// Converts [angle] to degrees.
export function rad2deg(angle: number): number {
	return 180 * angle / Math.PI;
}

// Converts [angle] to radians.
export function deg2rad(angle: number): number {
	return Math.PI * angle / 180;
}
