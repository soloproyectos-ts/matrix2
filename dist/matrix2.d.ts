import * as matrix from 'matrix';
export declare class Transformation extends matrix.Transformation {
    constructor(...vectors: matrix.Vector[]);
    static createFromValues(a: number, b: number, c: number, d: number, e: number, f: number): Transformation;
    transform(t: Transformation): Transformation;
    rotate(angle: number, center?: matrix.Point): Transformation;
    translate(v: matrix.Vector): Transformation;
    scale(x: number, y?: number): Transformation;
    skewX(angle: number): Transformation;
    skewY(angle: number): Transformation;
}
