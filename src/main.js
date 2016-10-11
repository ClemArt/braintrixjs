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
    constructor(NBefore=2, N=2, weight=Matrix.randomMatrix(2,2), bias=Vector.randomVector(2), activation=Network.sigmoid, activationPrime=Network.sigmoidPrime){
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
        return activate(this._zOutput);
    }
    activate(zOutput){
        this._activation = zOutput.apply(this._activationFunction);
        return this._activation;
    }
}

/**
*   Build the network of neurons !
*   Params:
*       IDim: Integer (required) Number of input data (dimensions) fed into the input layer
*       NInput: Integer (required) Number of inputs neurons in the first layer
*       NOutput: Integer (default 0) Number of output neurons in the last layer
*       NHidden: Array[Integer] (default []) List of the number of neurons in each successive hidden layer (from Input to Output)
*/
class Network {
    constructor(IDim, NInput, NOutput=0, NHidden=[]){
        //Lets build the network
        let neurons = [NInput, ...NHidden];
        if(NOutput){
            neurons.push(NOutput);
        }

        this._layers = [];
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
