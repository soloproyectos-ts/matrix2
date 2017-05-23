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
        Transformation.prototype.rotate = function (angle, center) {
            var ret;
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);
            if (center !== undefined) {
                var c = matrix.Vector.createFromPoints(center);
                ret = this.translate(c.opposite()).rotate(angle).translate(c);
            }
            else {
                ret = this.transform(new Transformation(new matrix.Vector(cos, sin, 0), new matrix.Vector(-sin, cos, 0), new matrix.Vector(0, 0, 1)));
            }
            return ret;
        };
        Transformation.prototype.translate = function (v) {
            return this.transform(new Transformation(new matrix.Vector(1, 0, 0), new matrix.Vector(0, 1, 0), new matrix.Vector(v.x, v.y)));
        };
        Transformation.prototype.scale = function (x, y) {
            if (y === undefined) {
                y = x;
            }
            return this.transform(new Transformation(new matrix.Vector(x, 0, 0), new matrix.Vector(0, y, 0), new matrix.Vector(0, 0)));
        };
        Transformation.prototype.skewX = function (angle) {
            return this.transform(new Transformation(new matrix.Vector(1, 0, 0), new matrix.Vector(Math.tan(angle), 1, 0), new matrix.Vector(0, 0)));
        };
        Transformation.prototype.skewY = function (angle) {
            return this.transform(new Transformation(new matrix.Vector(1, Math.tan(angle), 0), new matrix.Vector(0, 1, 0), new matrix.Vector(0, 0)));
        };
        return Transformation;
    }(matrix.Transformation));
    exports.Transformation = Transformation;
});
