'use strict';
var _ = require('underscore');
var FirstPrisoner = require('./FirstPrisoner.js');
var SecondPrisoner = require('./SecondPrisoner.js');
var Utility = require('./Utility.js');

// Read in the input file and break it into lines.
var inputLines = require('fs').readFileSync(process.argv[2],'utf-8').split('\n');

// Validate the input.
var validatedInput = Utility.getValidatedBoardAndPointCoords(inputLines);
var board = validatedInput.board;
var pointCoordinates = {
	XCoord: validatedInput.XCoord,
	YCoord: validatedInput.YCoord
};

// Print the validated input.
Utility.printBoardAndPointLocation(board, pointCoordinates);

// Let the first prisoner flip a coin.
//var newBoard = FirstPrisoner.FlipACoin(board, pointCoordinates);

// Print the board after the flip.
Utility.printBoardAfterFlip(board);

var guessCoordinates = SecondPrisoner.FindTheSquare(board);

// Print the second prisoners guess for where the lucky square is!
Utility.printSecondPrisonerGuess(guessCoordinates, pointCoordinates);



