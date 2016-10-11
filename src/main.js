import { Matrix, Vector } from './matrix';

class Layer {
    constructor(NBefore=2, N=2, weight=Matrix.randomMatrix(2,2), bias=Vector.randomVector(2), activation=Network.sigmoid, activationPrime=Network.sigmoidPrime){
        this._weights = weight;
        this._bias = bias;
        this._activation;
        this._zOutput;
        this._activationFunction = activation;
        this._activationFunctionPrime = activationPrime;
    }

    forward(input){
        this._zOutput = this._weights.dot(input).add(this._bias);
        return activate(this._zOutput);
    }
    activate(zOutput){
        this._activation = zOutput.apply(this._activationFunction);
        return this._activation;
    }
}


class Network {
    constructor(){

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
