# braintrixjs
Simple js neural network using internal matrix operations.
Uses ES6 features, with babel for compatibility.

# Dependencies
* Native Math package (random & exp)

# Installation
	#	Install dependencies
	npm install

	#	Build the src from ES6 with Babel
	#	Output to build/
	npm run babelify

	#	Build & run (small) tests
	npm run test
# Usage
	#	ES6
	import { Network } from '<path_to_src>/main';

	#	All navigators (babelified)
	var Network = require('<path_to_build>/main');

	#	Create a network with 2 dimensions data feed, 2 neurons input layer, 3 neurons output layer, 6 neurons hidden layer
	var net = new Network(2, 2, 3, [6]);

# Documentation
## Build a network
Building a network is very simple, just define the size of the layers

	#   Build the network of neurons !
	#   Params:
	#       IDim: Integer (required) Number of input data (dimensions) fed into the input layer
	#       NInput: Integer (required) Number of inputs neurons in the first layer
	#       NOutput: Integer (default 0) Number of output neurons in the last layer
	#       NHidden: Array[Integer] (default []) List of the number of neurons in each successive hidden layer (from Input to Output)
	#       chromosome: Chromosome [see get chromosome] (optional) Chromosome to use to initialize the network
	new Network(IDim, NInput, NOutput=0, NHidden=[], chromosome);

## Process data
Forward an input feed through the network with one function

	#   Forward function, main purpose of the network
	#   Forward the input feed through all the layers and returns the output
	#   inputData: Array or Vector, size of IDim
	forward(inputData);

## Learn
Provides samples of pairs input/output and the network will adapt to fit them

	#	Learn from a batch of sample with backpropagation
	#   samples: Array[Input, Output], Input & Output as Vectors or Arrays, Learning sample composed of the input and the expected output
	#   learningRate: Number (default 0.1) Factor applied as a gradient step toward optimization
	#   repeat: Integer (default 1) Number of repetitions over the batch of samples (multiple pass)
	learnBatch(samples, learningRate=0.1, repeat=1)

## Export and Inport
You can export the network as a chromosome, which represents all the weights and bias in all the successive layers.
This chromosome can be used to rebuild a clone of the layer.

	#	Export
	net = new Network(params);
	net.chromosome => chromosome output

	#	Import
	net = new Chromosome(params, chromosome);

# To dig a little deeper
The default network uses a sigmoid function and it's derivative. This maps the output of the network to the ]0, 1[ interval.
It's possible (and probably recommended) to dig into the code and replace the activation and cost functions. Thus you can fine tune the network to your application's needs.
I recommend you read the article cited below, as it's a really good and progressive exploration of all the mathematics behind that kind of algorithms.

# Acknowledgement
Thanks to Michael Nielsen and his work at http://neuralnetworksanddeeplearning.com/index.html to help me understand the mathematics behind the neural network. (Michael A. Nielsen, "Neural Networks and Deep Learning", Determination Press, 2015)
