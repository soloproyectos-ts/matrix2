import * as matrix from 'matrix';
export { Matrix, SquareMatrix } from 'matrix';
export declare class Vector extends matrix.Vector {
    constructor(x: number, y: number);
    readonly x: number;
    readonly y: number;
}
export declare class Transformation extends matrix.Transformation {
    constructor(v0: Vector, v1: Vector, v2: Vector);
}
