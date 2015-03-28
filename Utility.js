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

	var boardArray = [];

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

		boardArray.push(lineArray);
	});

	var board = {
		rows:
		{
			1: boardArray[0],
			2: boardArray[1],
			3: boardArray[2],
			4: boardArray[3],
			5: boardArray[4],
			6: boardArray[5],
			7: boardArray[6],
			8: boardArray[7]
		},

		columns:
		{
			1:[],
			2:[],
			3:[],
			4:[],
			5:[],
			6:[],
			7:[],
			8:[]
		}
	};

	_.each(boardArray, function(row)
	{
		_.each(row, function(coin, column)
		{
			board.columns[column + 1].push(coin)
		});
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
	console.log(board)
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