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
define(["require", "exports", "matrix"], function (require, exports, matrix) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            var p = _super.prototype.transform.call(this, t);
            var _a = p.coordinates, x = _a[0], y = _a[1];
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
        Vector.createFromPoints = function (end, start) {
            var v = _super.createFromPoints.call(this, end, start);
            var _a = v.coordinates, x = _a[0], y = _a[1];
            return new Vector(x, y);
        };
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
            var v = _super.prototype.multiply.call(this, m);
            var _a = v.coordinates, x = _a[0], y = _a[1];
            return new Vector(x, y);
        };
        Vector.prototype.transform = function (t) {
            var v = _super.prototype.transform.call(this, t);
            var _a = v.coordinates, x = _a[0], y = _a[1];
            return new Vector(x, y);
        };
        Vector.prototype.opposite = function () {
            var v = _super.prototype.opposite.call(this);
            var _a = v.coordinates, x = _a[0], y = _a[1];
            return new Vector(x, y);
        };
        Vector.prototype.scale = function (value) {
            var v = _super.prototype.scale.call(this, value);
            var _a = v.coordinates, x = _a[0], y = _a[1];
            return new Vector(x, y);
        };
        Vector.prototype.sum = function (vector) {
            var v = _super.prototype.sum.call(this, vector);
            var _a = v.coordinates, x = _a[0], y = _a[1];
            return new Vector(x, y);
        };
        Vector.prototype.subtract = function (vector) {
            var v = _super.prototype.subtract.call(this, vector);
            var _a = v.coordinates, x = _a[0], y = _a[1];
            return new Vector(x, y);
        };
        return Vector;
    }(matrix.Vector));
    exports.Vector = Vector;
    var Line = (function () {
        function Line(origin, direction) {
            this.origin = origin;
            this.direction = direction;
        }
        Line.prototype.getParallel = function (p) {
            return new Line(p, this.direction);
        };
        Line.prototype.getPerpendicular = function (p) {
            return new Line(p, new Vector(-this.direction.y, this.direction.x));
        };
        Line.prototype.isParallel = function (l) {
            var v0 = this.direction;
            var v1 = l.direction;
            return v0.x * v1.y == v1.x * v0.y;
        };
        Line.prototype.getIntersection = function (l) {
            var _a = [this.origin, l.origin], p0 = _a[0], p1 = _a[1];
            var _b = [this.direction, l.direction], v0 = _b[0], v1 = _b[1];
            var m = new matrix.SquareMatrix(v0, v1.opposite());
            var v = Vector.createFromPoints(p1, p0);
            var w = v.multiply(m.inverse());
            var t = new Transformation().translate(v0.scale(w.x));
            return p0.transform(t);
        };
        return Line;
    }());
    exports.Line = Line;
    var Transformation = (function (_super) {
        __extends(Transformation, _super);
        function Transformation() {
            var vectors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                vectors[_i] = arguments[_i];
            }
            var _this = this;
            if (vectors.length == 0) {
                vectors.push(new matrix.Vector(1, 0, 0));
                vectors.push(new matrix.Vector(0, 1, 0));
                vectors.push(new matrix.Vector(0, 0, 1));
            }
            _this = _super.apply(this, vectors) || this;
            return _this;
        }
        Transformation.createFromValues = function (a, b, c, d, e, f) {
            return new Transformation(new matrix.Vector(a, b, 0), new matrix.Vector(c, d, 0), new matrix.Vector(e, f, 1));
        };
        Transformation.prototype.transform = function (t) {
            return new (Transformation.bind.apply(Transformation, [void 0].concat(_super.prototype.transform.call(this, t).vectors)))();
        };
        Transformation.prototype.inverse = function () {
            var t = _super.prototype.inverse.call(this);
            return new (Transformation.bind.apply(Transformation, [void 0].concat(t.vectors)))();
        };
        Transformation.prototype.rotate = function (angle, center) {
            var ret;
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);
            if (center !== undefined) {
                var c = Vector.createFromPoints(center);
                ret = this.translate(c.opposite()).rotate(angle).translate(c);
            }
            else {
                ret = this.transform(new Transformation(new matrix.Vector(cos, sin, 0), new matrix.Vector(-sin, cos, 0), new matrix.Vector(0, 0, 1)));
            }
            return ret;
        };
        Transformation.prototype.translate = function (v) {
            return this.transform(new Transformation(new matrix.Vector(1, 0, 0), new matrix.Vector(0, 1, 0), new matrix.Vector(v.x, v.y, 1)));
        };
        Transformation.prototype.scale = function (x, y) {
            if (y === undefined) {
                y = x;
            }
            return this.transform(new Transformation(new matrix.Vector(x, 0, 0), new matrix.Vector(0, y, 0), new matrix.Vector(0, 0, 0)));
        };
        Transformation.prototype.skewX = function (angle) {
            return this.transform(new Transformation(new matrix.Vector(1, 0, 0), new matrix.Vector(Math.tan(angle), 1, 0), new matrix.Vector(0, 0, 0)));
        };
        Transformation.prototype.skewY = function (angle) {
            return this.transform(new Transformation(new matrix.Vector(1, Math.tan(angle), 0), new matrix.Vector(0, 1, 0), new matrix.Vector(0, 0, 0)));
        };
        Transformation.prototype.toString = function () {
            var _a = this.vectors, v0 = _a[0], v1 = _a[1], v2 = _a[2];
            var _b = v0.coordinates, a = _b[0], b = _b[1];
            var _c = v1.coordinates, c = _c[0], d = _c[1];
            var _d = v2.coordinates, e = _d[0], f = _d[1];
            return "matrix(" + a + " " + b + " " + c + " " + d + " " + e + " " + f + ")";
        };
        return Transformation;
    }(matrix.Transformation));
    exports.Transformation = Transformation;
    function rad2deg(angle) {
        return 180 * angle / Math.PI;
    }
    exports.rad2deg = rad2deg;
    function deg2rad(angle) {
        return Math.PI * angle / 180;
    }
    exports.deg2rad = deg2rad;
});
