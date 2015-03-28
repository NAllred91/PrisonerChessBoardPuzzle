'use strict';

var _ = require('underscore');

var getValidatedBoardAndPointCoords = function(inputLines)
{
	var InvalidInput = function(err)
	{
		console.log("Invalid input file...");
		console.log("Error:" + err);
		process.exit();
	}

	// File must contain 9 lines.
	if(inputLines.length !== 9)
	{
		InvalidInput(1);
	}

	var board = [];

	// First 8 lines contain the coins on the board.
	_.each(_.first(inputLines, 8), function(line)
	{
		var lineArray = [];

		// Validate the lines lenght and content.
		if(line.length !== 8)
		{
			InvalidInput(2);
		}

		_.each(line, function(letter)
		{
			if(letter === '0' || letter === '1')
			{
				lineArray.push(letter);
			}
			else
			{
				InvalidInput(3);
			}
		});

		board.push(lineArray);
	});

	var lastLine = _.last(inputLines);

	if(lastLine.length !== 2)
	{
		InvalidInput(4);
	}

	var XCoord = parseInt(_.first(lastLine));

	if(_.isNaN(XCoord) || XCoord < 1 || XCoord > 8)
	{
		InvalidInput(5);
	}

	var YCoord = parseInt(_.last(lastLine));

	if(_.isNaN(YCoord) || YCoord < 1 || YCoord > 8)
	{
		InvalidInput(5);
	}

	return {
		board: board,
		XCoord: XCoord,
		YCoord: YCoord
	}
};

var printBoardAndPointLocation = function(board, XCoord, YCoord)
{

};

var printBoardAfterFlip = function(board)
{

};

var printSecondPrisonerGuess = function(guessCoordinates, actualCoordinates)
{

};

exports.getValidatedBoardAndPointCoords = getValidatedBoardAndPointCoords;
exports.printBoardAndPointLocation = printBoardAndPointLocation;
exports.printBoardAfterFlip = printBoardAfterFlip;
exports.printSecondPrisonerGuess = printSecondPrisonerGuess;