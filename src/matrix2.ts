/// <reference path="../typings/index" />

import * as matrix from 'matrix';

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

	rotate(angle: number, center?: matrix.Point): Transformation {
		let ret: Transformation;
		let cos = Math.cos(angle);
		let sin = Math.sin(angle);

		if (center !== undefined) {
			let c = matrix.Vector.createFromPoints(center);

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

	translate(v: matrix.Vector): Transformation {
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
