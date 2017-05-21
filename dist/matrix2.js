var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "matrix", "matrix"], function (require, exports, matrix, matrix_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Matrix = matrix_1.Matrix;
    exports.SquareMatrix = matrix_1.SquareMatrix;
    var Point = (function (_super) {
        __extends(Point, _super);
        function Point(x, y) {
            return _super.call(this, x, y) || this;
        }
        Object.defineProperty(Point.prototype, "x", {
            get: function () {
                return this.coordinates[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Point.prototype, "y", {
            get: function () {
                return this.coordinates[1];
            },
            enumerable: true,
            configurable: true
        });
        Point.prototype.transform = function (t) {
            var _a = _super.prototype.transform.call(this, t).coordinates, x = _a[0], y = _a[1];
            return new Point(x, y);
        };
        return Point;
    }(matrix.Point));
    exports.Point = Point;
    var Vector = (function (_super) {
        __extends(Vector, _super);
        function Vector(x, y) {
            return _super.call(this, x, y) || this;
        }
        Object.defineProperty(Vector.prototype, "x", {
            get: function () {
                return this.coordinates[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "y", {
            get: function () {
                return this.coordinates[1];
            },
            enumerable: true,
            configurable: true
        });
        Vector.prototype.multiply = function (m) {
            var _a = _super.prototype.multiply.call(this, m).coordinates, x = _a[0], y = _a[1];
            return new Vector(x, y);
        };
        Vector.prototype.transform = function (t) {
            var _a = _super.prototype.transform.call(this, t).coordinates, x = _a[0], y = _a[1];
            return new Vector(x, y);
        };
        Vector.prototype.opposite = function () {
            var _a = _super.prototype.opposite.call(this).coordinates, x = _a[0], y = _a[1];
            return new Vector(x, y);
        };
        Vector.prototype.scale = function (value) {
            var _a = _super.prototype.scale.call(this, value).coordinates, x = _a[0], y = _a[1];
            return new Vector(x, y);
        };
        Vector.prototype.sum = function (vector) {
            var _a = _super.prototype.sum.call(this, vector).coordinates, x = _a[0], y = _a[1];
            return new Vector(x, y);
        };
        Vector.prototype.subtract = function (vector) {
            var _a = _super.prototype.subtract.call(this, vector).coordinates, x = _a[0], y = _a[1];
            return new Vector(x, y);
        };
        return Vector;
    }(matrix.Vector));
    exports.Vector = Vector;
    var Transformation = (function (_super) {
        __extends(Transformation, _super);
        function Transformation(v0, v1, v2) {
            return _super.call(this, v0, v1, v2) || this;
        }
        return Transformation;
    }(matrix.Transformation));
    exports.Transformation = Transformation;
});
