import { _ } from 'underscore';

class Matrix {
    constructor(n=0,m=0,valueArray=[]){
        //built by rows
        if(valueArray.length === n){
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
        vector = Vector.convertInput(vector);
        this.checkVectorMult(vector);

        let output = [];
        for(let i=0; i<this._n; i++){
            let row = new Vector(this._values.slice(i * this._m, (i+1) * this._m));
            output.push(row.dot(vector));
        }

        return new Vector(output);
    }

    checkVectorMult(vector){
        if(this._m !== vector.length){
            throw "Vector of dimension " + vector.length + ' does not match matrix dimension ' + this._m;
        }
    }

    static randomMatrix(n,m){
        let output = [];
        for(let i=0; i<m*n; i++){
            output.push(Math.random());
        }
        return new Matrix(n,m,output);
    }

}

class Vector {
    constructor(values){
        this._values = values;
    }

    dot(vector){
        vector = Vector.convertInput(vector);
        this.checkVectorLength(vector);

        let output = 0;
        for(let i=0; i<this.length; i++){
            output += this.v(i) * vector.v(i);
        }

        return output;
    }

    add(vector){
        vector = Vector.convertInput(vector);
        this.checkVectorLength(vector);

        let output = [];
        for(let i=0; i<this.length; i++){
            output.push(this.v(i) + vector.v(i));
        }

        return new Vector(output);
    }

    /**
    *   Apply a function to all elements of the vector
    */
    apply(func){
        for(let i=0; i<this.length; i++){
            this._values[i] = func(this.v(i));
        }
        return this;
    }

    v(i){
        return this._values[i];
    }

    get length(){
        return this._values.length;
    }

    checkVectorLength(vector){
        if(this.length !== vector.length){
            throw "Vector of dimension " + vector.length + ' does not match vector dimension ' + this.length;
        }
    }

    static randomVector(n){
        let output = [];
        for(let i=0; i<n; i++){
            output.push(Math.random());
        }
        return new Vector(output);
    }

    static convertInput(values){
        if(values.constructor === Array){
            return new Vector(values);
        } else {
            return values;
        }
    }
}

export {Matrix, Vector};
