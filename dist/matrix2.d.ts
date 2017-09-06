import * as matrix from 'matrix';
export interface Positionable extends matrix.Positionable {
    readonly x: number;
    readonly y: number;
}
export declare type Point = Vector;
export declare class Vector extends matrix.Vector implements Positionable {
    constructor(x: number, y: number);
    readonly x: number;
    readonly y: number;
    multiply(m: matrix.Matrix): Vector;
    transform(t: Transformation): Vector;
    opposite(): Vector;
    scale(value: number): Vector;
    sum(vector: Vector): Vector;
    subtract(vector: Vector): Vector;
    unit(): Vector;
}
export declare class Line {
    readonly origin: Point;
    readonly direction: Vector;
    constructor(origin: Point, direction: Vector);
    getParallel(p: Point): Line;
    getPerpendicular(p: Point): Line;
    isParallel(l: Line): boolean;
    getIntersection(l: Line): Point;
}
export declare class Transformation extends matrix.Transformation {
    constructor(...vectors: matrix.Vector[]);
    static createFromValues(a: number, b: number, c: number, d: number, e: number, f: number): Transformation;
    transform(t: Transformation): Transformation;
    inverse(): Transformation;
    translate(v: Vector): Transformation;
    rotate(angle: number, params?: {
        center: Point;
    }): Transformation;
    scale(value: number | Vector, params?: {
        center: Point;
    }): Transformation;
    skew(value: number | Vector, params?: {
        center: Point;
    }): Transformation;
    toString(): string;
}
export declare function rad2deg(angle: number): number;
export declare function deg2rad(angle: number): number;
