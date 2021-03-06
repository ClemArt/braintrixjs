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

//Transpose
let trans = new Matrix(2,3,[1,2,3,4,5,6]);
let transposed = trans.transpose();
console.log('Pretransposed Matrix', trans);
console.log('Transposed Matrix', transposed);

//Dot matrix
let dotMatrix = new Matrix(2,2,[1,2,3,4]);
let resultDotM = dotMatrix.dotMat(dotMatrix);
console.log('Matrix multiplication', resultDotM);

//Add vectors
let vadd1 = new Vector([1,2]);
let vadd2 = new Vector([2,3]);
let addV12 = vadd1.add(vadd2);
console.log('Add vectors', addV12);

//Norm
console.log('Norm of previous vects', vadd1.norm);
console.log('Norm of previous vects', vadd2.norm);
console.log('Norm 1 ', new Vector([1/1.4142, 1/1.4142]).norm);

//dot product
let v1 = new Vector([1,1]);
let cross = v1.dot(v1);
console.log('Dot vectors', cross);

//Hadamard product
let vh1 = new Vector([2,3]);
let vh2 = new Vector([4,5]);
let hadamard = vh1.hadamard(vh2);
console.log('Hadamard vectors', hadamard);

let m1 = new Matrix(2,2,[1,1,1,1]);
cross = m1.dot(v1);
console.log('Dot matrix & vector', cross);

//Build network
let net1 = new Network(2, 3, 3);
let dataFeed = [1,1];
let dataOut = net1.forward(dataFeed);
console.log('Random network out', dataOut);
console.log('chromosome', net1.chromosome);

let net2 = new Network(3, 1, 6, [12, 4]);
let dataFeed2 = [1,1,-3];
let dataOut2 = net2.forward(dataFeed2);
console.log('Random complex network out', dataOut2);
console.log('chromosome', net2.chromosome);

let net3 = new Network(12, 1);
let dataFeed3 = [1, 1, -3,
                0, 4, 5,
                1, -5, 6,
                3, -4, 0];
let dataOut3 = net3.forward(dataFeed3);
console.log('Random single perceptron', dataOut3);
console.log('chromosome', net3.chromosome);

//Rebuild from chromosome
let chrom1 = net1.chromosome;
let net1Bis = new Network(2, 3, 3, [], chrom1);
let dataOut1Bis = net1Bis.forward(dataFeed);
console.log('Reproduce network 1', dataOut1Bis);

//Backpropagate a single sample
let netBack1 = new Network(2, 3, 3);
let backIn = [1,2];
let backOut = [0.5, 0.1, 0.3];
let outBack1 = netBack1.forward(backIn);
let error1 = netBack1.backpropagate(backIn, backOut);
console.log('Backpropagate one sample', outBack1, error1);

//Learn batch
let samples = [
    [[1,0],[0,0,1]],
    [[0,1],[1,0,0]],
    [[-1,-1],[0,1,0]]
];
let netToTrain = new Network(2, 3);
console.log('Net to train\'s chromosomes', netToTrain.chromosome);
console.log('Net to train\'s result on 1', netToTrain.forward([1,0]));
netToTrain.learnBatch(samples, 1, 1000);
console.log('Net to train\'s chromosomes after train', netToTrain.chromosome);
console.log('Net to train\'s result on 1 after train', netToTrain.forward([1,0]));
console.log('Net to train\'s result on 2 after train', netToTrain.forward([0,1]));
console.log('Net to train\'s result on 3 after train', netToTrain.forward([-1,-1]));
