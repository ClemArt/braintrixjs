
let _ = require('underscore');

module.exports.Matrix = class Matrix {
    constructor(n=0,m=0,valueArray=[]){
        //built by columns
        if(valueArray.length === m){
            valueArray = _.flatten(valueArray);
        }
        //Unwrapped array
        if(valueArray.length !== n*m){
            throw "Values array must be of lenght n*m";
        }
        this._n = n;
        this._m = m;
        this._values = valueArray;
    }

    v(i,j){
        return _this.valueArray[i * this_.m + j];
    }

    dot(vector){
        vector = Matrix.convertInput(vector);
        this.checkVectorMult(vector);

        let output = [];
        for(let i=0; i<this._n; i++){

        }
    }

    checkVectorMult(vector){
        if(this._m !== vector.length){
            throw "Vector of dimension " + vector.length + ' does not match matrix dimension ' + this._m;
        }
    }

    static convertInput(values){
        if(values.constructor === Array){
            return new Vector(values);
        } else {
            return values;
        }
    }
}

module.exports.Vector = class Vector {
    constructor(values){
        this._values = values;
    }

    get length(){
        return this._values.length;
    }
}
