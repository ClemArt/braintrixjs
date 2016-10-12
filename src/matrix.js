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
        return this.val[i * this._m + j];
    }

    /**
    *   Multiply Matrix with a Vector
    */
    dot(vector){
        vector = Vector.convertInput(vector);
        this.checkVectorMult(vector);

        let output = [];
        for(let i=0; i<this._n; i++){
            let row = new Vector(this.val.slice(i * this._m, (i+1) * this._m));
            output.push(row.dot(vector));
        }

        return new Vector(output);
    }

    add(matrix){
        this.checkMatrixDim(matrix);
        let output = [];
        for(let i=0; i<this.length; i++){
            output.push(this.v(Math.floor(i/this._m), i % this._m) + matrix.v(Math.floor(i/this._m), i % this._m));
        }
        return new Matrix(this._n, this._m, output);
    }

    mult(num){
        let output = [];
        for(let i=0; i<this.length; i++){
            output.push(this.v(Math.floor(i/this._m), i % this._m) * num);
        }
        return new Matrix(this._n, this._m, output);
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

    dotMat(matrix){
        //Decompose the right matrix into an array of vectors
        let vectors = [];
        let tMatrix = matrix.transpose();
        for(let i=0; i<matrix._m; i++){
            let v = new Vector(tMatrix.val.slice(i * matrix._n, (i+1) * matrix._n));
            vectors.push(...this.dot(v).val);
        }
        let out = new Matrix(matrix._m, this._n, vectors);
        return out.transpose();
    }

    checkVectorMult(vector){
        if(this._m !== vector.length){
            throw "Vector of dimension " + vector.length + ' does not match Matrix dimension ' + this._m;
        }
    }

    checkMatrixDim(matrix){
        if(this._m !== matrix._m || this._n !== matrix._n){
            throw "Matrix of dimension " + matrix._n + ',' + matrix._m + ' does not match Matrix dimension ' + this._n + ',' + this._m;
        }
    }

    get val(){
        return this._values;
    }

    get length(){
        return this.val.length;
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
        return this.val[i];
    }

    get length(){
        return this.val.length;
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
