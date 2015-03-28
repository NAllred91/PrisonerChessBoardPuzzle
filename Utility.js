'use strict';

var PreviousArrangements = require('./PreviousArrangements.js');
var _ = require('underscore');

var getValidatedBoardAndPointCoords = function(inputLines)
{
	var InvalidInput = function(err)
	{
		console.log("Invalid input file...");
		console.log("Error:" + err);
		process.exit();
	}

	if(!inputLines || !_.isArray(inputLines))
	{
		InvalidInput(0);
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

		// Validate the lines length and content.
		if(line.length !== 8)
		{
			InvalidInput(2);
		}

		_.each(line, function(letter)
		{
			if(letter === PreviousArrangements.heads || letter === PreviousArrangements.tails)
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

var printBoardAndPointLocation = function(board, coordinates)
{
	console.log('\n\n');
	printBoard(board, coordinates);
	console.log("\nThis is the original board.")
	console.log("The lucky square is in row " + coordinates.XCoord + " and in column " + coordinates.YCoord + ".")
};

var printBoardAfterFlip = function(board, coordinates)
{
	console.log('\n\n');
	printBoard(board, coordinates);
	console.log("This is the board after the first prisoner flipped a coin.")
	console.log("The coin was flipped in row " + coordinates.XCoord + " and in column " + coordinates.YCoord + ".");
};

var printSecondPrisonerGuess = function(guessCoordinates, actualCoordinates)
{
	console.log('\n\n');
	console.log("The second prisoner guesses that the lucky")
	console.log("square was in row " + guessCoordinates.XCoord + " and in column " + guessCoordinates.YCoord + ".");

	if(guessCoordinates.XCoord === actualCoordinates.XCoord && guessCoordinates.YCoord === actualCoordinates.YCoord)
	{
		console.log("\nThis is correct.");
		return true;
	}
	else
	{
		console.log("\nThis is incorrect.");
		return false;
	}
};

var printBoard = function(board, coordinates)
{
	var coordRow = coordinates.XCoord;
	var coordCol = coordinates.YCoord;
	console.log("    1  2  3  4  5  6  7  8")
	_.each(board.rows, function(row, rowNumber)
	{
		var lineNumber = rowNumber
		var line = lineNumber + "  ";
		_.each(row, function(coin, colNumber)
		{
			if(rowNumber == coordRow && colNumber == coordCol - 1)
			{
				line = line + "!" + coin + "!";
			}
			else
			{
				line = line + " " + coin + " ";
			}
		});
		console.log(line);
	});
}

var generateTestInputData = function()
{
	var inputData = [];

	_.times(8, function()
	{
		var line = "";
		_.times(8, function()
		{
			if(_.random(0,1) === 0)
			{
				line = line.concat('x');
			}
			else
			{
				line = line.concat('o');
			}
		});
		inputData.push(line);
	});

	var luckySquare = ''.concat(_.random(1,8));
	luckySquare = luckySquare.concat(_.random(1,8));
	inputData.push(luckySquare);
	return inputData;
}

exports.generateTestInputData = generateTestInputData;
exports.getValidatedBoardAndPointCoords = getValidatedBoardAndPointCoords;
exports.printBoardAndPointLocation = printBoardAndPointLocation;
exports.printBoardAfterFlip = printBoardAfterFlip;
exports.printSecondPrisonerGuess = printSecondPrisonerGuess;