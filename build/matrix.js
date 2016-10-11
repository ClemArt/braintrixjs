"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Vector = exports.Matrix = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require("underscore");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Matrix = function () {
    function Matrix() {
        var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var valueArray = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

        _classCallCheck(this, Matrix);

        //built by columns
        if (valueArray.length === m) {
            valueArray = _underscore._.flatten(valueArray);
        }
        //Unwrapped array
        if (valueArray.length !== n * m) {
            throw "Values array must be of lenght n*m";
        }
        this._n = n;
        this._m = m;
        this._values = valueArray;
    }

    _createClass(Matrix, [{
        key: "v",
        value: function v(i, j) {
            return _this.valueArray[i * this_.m + j];
        }
    }, {
        key: "dot",
        value: function dot(vector) {
            vector = Vector.convertInput(vector);
            this.checkVectorMult(vector);

            var output = [];
            for (var i = 0; i < this._n; i++) {
                var row = new Vector(this._values.slice(i * this._m, (i + 1) * this._m));
                output.push(row.dot(vector));
            }

            return new Vector(output);
        }
    }, {
        key: "checkVectorMult",
        value: function checkVectorMult(vector) {
            if (this._m !== vector.length) {
                throw "Vector of dimension " + vector.length + ' does not match matrix dimension ' + this._m;
            }
        }
    }]);

    return Matrix;
}();

var Vector = function () {
    function Vector(values) {
        _classCallCheck(this, Vector);

        this._values = values;
    }

    _createClass(Vector, [{
        key: "dot",
        value: function dot(vector) {
            vector = Vector.convertInput(vector);
            this.checkVectorDot(vector);

            var output = 0;
            for (var i = 0; i < this.length; i++) {
                output += this.v(i) * vector.v(i);
            }

            return output;
        }
    }, {
        key: "v",
        value: function v(i) {
            return this._values[i];
        }
    }, {
        key: "checkVectorDot",
        value: function checkVectorDot(vector) {
            if (this.length !== vector.length) {
                throw "Vector of dimension " + vector.length + ' does not match vector dimension ' + this.length;
            }
        }
    }, {
        key: "length",
        get: function get() {
            return this._values.length;
        }
    }], [{
        key: "convertInput",
        value: function convertInput(values) {
            if (values.constructor === Array) {
                return new Vector(values);
            } else {
                return values;
            }
        }
    }]);

    return Vector;
}();

exports.Matrix = Matrix;
exports.Vector = Vector;