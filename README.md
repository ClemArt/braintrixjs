# braintrixjs
Simple js neural network using internal matrix operations.
Uses ES6 features, with babel for compatibility.

# Dependencies
* UnderscoreJS

# Installation
	#Install dependencies
	npm install

	#Build the src from ES6 with Babel
	#Output to build/
	npm run babelify

	#Build & run (small) tests
	npm run test
# Usage
	#ES6
	import { Network } from '<path_to_src>/main';

	#All navigators (babelified)
	var Network = require('<path_to_build>/main');

	#Create a network with 2 dimensions data feed, 2 neurons input layer, 3 neurons output layer, 6 neurons hidden layer
	var net = new Network(2, 2, 3, [6]);

# Documentation
See comments in source

# Acknowledgement
Thanks to Michael Nielsen and his work at http://neuralnetworksanddeeplearning.com/index.html to help me understand the mathematics behind the neural network. (Michael A. Nielsen, "Neural Networks and Deep Learning", Determination Press, 2015)
