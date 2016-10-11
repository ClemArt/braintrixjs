class Matrix {
    constructor(n=0,m=0,valueArray=[]){
        //Unwrapped array
        if(valueArray.length !== n*m){
            throw "Values array must be of lenght n*m";
        }
        this._n = n;
        this._m = m;
        this._values = valueArray;
    }

    v(i,j){
        return this._values[i * this._m + j];
    }

    /**
    *   Multiply Matrix with a Vector
    */
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

    /**
    *   Return the transposed self
    */
    transpose(){
        let transposeValues = [];
        for(let j=0; j<this._m; j++){
            for(let i=0; i<this._n; i++){
                transposeValues.push(this.v(i,j));
            }
        }
        return new Matrix(this._m, this._n, transposeValues);
    }

    checkVectorMult(vector){
        if(this._m !== vector.length){
            throw "Vector of dimension " + vector.length + ' does not match matrix dimension ' + this._m;
        }
    }

    get val(){
        return this._values;
    }

    get length(){
        return this._values.length;
    }

    static randomMatrix(n,m){
        let output = [];
        for(let i=0; i<m*n; i++){
            output.push(random());
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

    mult(num){
        let output = [];
        for(let i=0; i<this.length; i++){
            output.push(this.v(i) * num);
        }

        return new Vector(output);
    }

    /**
    *   Apply a function to all elements of the vector
    */
    apply(func){
        let output = [];
        for(let i=0; i<this.length; i++){
            output.push(func(this.v(i)));
        }
        return new Vector(output);
    }

    /**
    *   Hadamard product of 2 vectors, also called Elementwise product
    */
    hadamard(vector){
        vector = Vector.convertInput(vector);
        this.checkVectorLength(vector);

        let output = [];
        for(let i=0; i<this.length; i++){
            output.push(this.v(i) * vector.v(i));
        }

        return new Vector(output);
    }

    v(i){
        return this._values[i];
    }

    get length(){
        return this._values.length;
    }

    get val(){
        return this._values;
    }

    checkVectorLength(vector){
        if(this.length !== vector.length){
            throw "Vector of dimension " + vector.length + ' does not match vector dimension ' + this.length;
        }
    }

    static randomVector(n){
        let output = [];
        for(let i=0; i<n; i++){
            output.push(random());
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

function random(){
    return Math.random() * 2 - 1;
}
