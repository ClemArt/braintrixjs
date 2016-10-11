let { Matrix, Vector } = require('../build/matrix');

//new Matrix
let a = new Matrix();
let b = new Matrix(2,2,[1,2,3,4]);
console.log(a, b);

//Error thrown
try {
    let errorMat1 = new Matrix(2,3,[1,2,3,4,5]);
} catch (err){
    console.log(err);
}

//dot product
let v1 = new Vector([1,1]);
let cross = v1.dot(v1);
console.log(cross);

let m1 = new Matrix(2,2,[1,1,1,1]);
cross = m1.dot(v1);
console.log(cross);