import { Matrix, Vector } from './matrix';

/**
*   Build a single layer of neurons, with an activation function and init bias & weights
*   Params:
*       NBefore: Integer (default 2) Number of inputs neurons (neurons in the previous layer, equivalent to the m weight matrix's dimension)
*       N: Integer (default 2) Number of neurons in the layer (equivalent to the n weight matrix's dimension & bias dimension)
*       weight: Matrix(N, NBefore) (default random Matrix(2,2)) Initial matrix of weights
*       bias: Vector(N) (default random Vector(2)) Initial bias of the neurons
*       activation: function(Number) (default Network.sigmoid) Activation function of the neurons, must be derivable once
*       activationPrime: function(Number) (default Network.sigmoidPrime) Derivative of the activation function, used for gradient descent
*/
class Layer {
    constructor(NBefore=2, N=2, weight=Matrix.randomMatrix(N, NBefore), bias=Vector.randomVector(N), activation=Network.sigmoid, activationPrime=Network.sigmoidPrime){
        this._weights = weight;
        this._bias = bias;
        this._activation;
        this._zOutput;
        this._activationFunction = activation;
        this._activationFunctionPrime = activationPrime;
    }

    /**
    *   Forward the input from the previous layer into this one.
    *   Save result and returns the activation vector of this layer
    */
    forward(input){
        this._zOutput = this._weights.dot(input).add(this._bias);
        return this.activate(this._zOutput);
    }
    activate(zOutput){
        this._activation = zOutput.apply(this._activationFunction);
        return this._activation;
    }

    /**
    *   Return the chromosomic representation of the layer
    *   Chromosome = [weights as Array, bias as Array];
    */
    get chromosome(){
        return [this._weights.val, this._bias.val];
    }
}

/**
*   Build the network of neurons !
*   Params:
*       IDim: Integer (required) Number of input data (dimensions) fed into the input layer
*       NInput: Integer (required) Number of inputs neurons in the first layer
*       NOutput: Integer (default 0) Number of output neurons in the last layer
*       NHidden: Array[Integer] (default []) List of the number of neurons in each successive hidden layer (from Input to Output)
*       chromosome: Chromosome [see get chromosome] (optional) Chromosome to use to initialize the network
*/
class Network {
    constructor(IDim, NInput, NOutput=0, NHidden=[], chromosome){
        //Lets build the network
        let neurons = [NInput, ...NHidden];
        if(NOutput){
            neurons.push(NOutput);
        }

        this._layers = [];

        //Random input, no chromosome definition
        if(!chromosome){
            //First layer is special
            this._layers.push(new Layer(IDim, NInput));
            //Next layers
            for(let i=1; i<neurons.length; i++){
                this._layers.push(new Layer(neurons[i-1], neurons[i]));
            }
        } else {
            //First layer is special
            this._layers.push(new Layer(IDim, NInput, new Matrix(NInput, IDim, chromosome[0][0]), new Vector(chromosome[0][1])));
            //Next layers
            for(let i=1; i<neurons.length; i++){
                this._layers.push(new Layer(
                    neurons[i-1],
                    neurons[i],
                    new Matrix(neurons[i], neurons[i-1], chromosome[i][0]),
                    new Vector(chromosome[i][1])
                ));
            }
        }

        this._costFunctionPrime = Network.quadraticCostPrime;
    }

    /**
    *   Forward function, main purpose of the network
    *   Forward the input feed through all the layers and returns the output
    *   inputData: Array or Vector, size of IDim
    */
    forward(inputData){
        let currentActivation = inputData;
        for(let currentLayer of this._layers){
            currentActivation = currentLayer.forward(currentActivation);
        }
        return currentActivation;
    }

    /**
    *   Backpropagate a single sample throught the network
    *   Record the error of each layer
    *   Output the cost differential on each weight/bias
    *   input: Array[Number] or Vector, Input data for the sample
    *   expected: Array[Number] or Vector, expected output of the training sample
    */
    backpropagate(input, expected){
        input = Vector.convertInput(input);
        expected = Vector.convertInput(expected);
        let L = this._layers.length;
        let deltas = [];
        let output = this.forward(input);

        //Compute the gradient of the last layer error
        let gradient = [];
        for(let i=0; i<output.length; i++){
            gradient.push(this._costFunctionPrime(output.v(i), expected.v(i)));
        }
        gradient = new Vector(gradient);

        //Last layer delta
        let lastLayer = this._layers[this._layers.length - 1];
        let actiPrime = lastLayer._zOutput.apply(lastLayer._activationFunctionPrime);
        deltas.push(gradient.hadamard(actiPrime));

        //Other layers
        for(let k=2; k<=L; k++){
            let currentError = this._layers[L-k+1]._weights.transpose().dot(deltas[k-2]);
            let currentActiPrime = this._layers[L-k]._zOutput.apply(this._layers[L-k]._activationFunctionPrime);
            deltas.push(currentError.hadamard(currentActiPrime));
        }

        deltas.reverse();

        let biasDiff = [];
        let weightDiff = [];

        biasDiff.push(deltas[0]);
        let M = input.length;
        let N = deltas[0].length
        let w = [];
        for(let k=0; k<M*N; k++){
            w.push(input.v(k % M) * deltas[0].v(Math.floor(k/M)));
        }
        weightDiff.push(new Matrix(N,M,w));

        for(let ii=1; ii<L; ii++){
            biasDiff.push(deltas[ii]);
            let previousLayer = this._layers[ii-1];
            let M = previousLayer._activation.length;
            let N = deltas[ii].length
            w = [];
            for(let k=0; k<M*N; k++){
                w.push(previousLayer._activation.v(k % M) * deltas[ii].v(Math.floor(k/M)));
            }
            weightDiff.push(new Matrix(N,M,w));
        }

        return [weightDiff, biasDiff];
    }

    /**
    *   Learn from a batch of sample with backpropagation
    *   samples: Array[Input, Output], Input & Output as Vectors or Arrays, Learning sample composed of the input and the expected output
    *   learningRate: Number (default 0.1) Factor applied as a gradient step toward optimization
    *   repeat: Integer (default 1) Number of repetitions over the batch of samples (multiple pass)
    */
    learnBatch(samples, learningRate=0.1, repeat=1){
        //opposite of learning rate, just the minus sign of the gradient descent applied
        learningRate *= -1;
        while(repeat){
            repeat--;
            for(let [input, expected] of samples){
                let [w, b] = this.backpropagate(input, expected);
                for(let i=0; i<this._layers.length; i++){
                    let cLayer = this._layers[i];
                    cLayer._weights = cLayer._weights.add(w[i].mult(learningRate));
                    cLayer._bias = cLayer._bias.add(b[i].mult(learningRate));
                }
            }
        }
    }

    /**
    *   Return the chromosomic representation of the network
    *   Chromosome = Array[weights of layer k as Array, bias of layer k as Array], k from input to output;
    */
    get chromosome(){
        let chrom = [];
        for(let layer of this._layers){
            chrom.push(layer.chromosome);
        }
        return chrom;
    }

    static sigmoid(a){
        return 1 / ( 1 + Math.exp(-a) );
    }

    static sigmoidPrime(a){
        return Math.exp(a) / ((1+Math.exp(a))*(1+Math.exp(a)));
    }

    static quadraticCostPrime(out, tgt){
        return (out - tgt);
    }
}

export { Network }
