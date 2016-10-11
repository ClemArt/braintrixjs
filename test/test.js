let { Matrix, Vector } = require('../build/matrix');
let { Network } = require('../build/main');

//new Matrix
let a = new Matrix();
let b = new Matrix(2,2,[1,2,3,4]);
console.log('Matrix creation', a, b);

//Error thrown
try {
    let errorMat1 = new Matrix(2,3,[1,2,3,4,5]);
} catch (err){
    console.log('Matrix creation exception', err);
}

//Add vectors
let vadd1 = new Vector([1,2]);
let vadd2 = new Vector([2,3]);
let addV12 = vadd1.add(vadd2);
console.log('Add vectors', addV12);

//dot product
let v1 = new Vector([1,1]);
let cross = v1.dot(v1);
console.log('Dot vectors', cross);

let m1 = new Matrix(2,2,[1,1,1,1]);
cross = m1.dot(v1);
console.log('Dot matrix & vector', cross);

//Build network
let net1 = new Network(2, 3, 3);
let dataFeed = [1,1];
let dataOut = net1.forward(dataFeed);
console.log('Random network out', dataOut);
