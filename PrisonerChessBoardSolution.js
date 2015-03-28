'use strict';
var _ = require('underscore');
var FirstPrisoner = require('./FirstPrisoner.js');
var SecondPrisoner = require('./SecondPrisoner.js');
var Utility = require('./Utility.js');
var prompt = require('prompt');
prompt.start();

var promptUser = function(callback)
{
	prompt.get(['Trials'], function(err, result)
	{
		if(!_.isNumber(parseInt(result.Trials)) || result.Trials < 0 || err)
		{
			console.log("Invalid...");
			promptUser(callback);
		}
		else
		{
			callback(parseInt(result.Trials));
		}
	});
};

var start = function(inputLines)
{

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
	var move = FirstPrisoner.FlipACoin(board, pointCoordinates);

	// Print the board after the flip.
	Utility.printBoardAfterFlip(move.board, move.coordinates);

	var guessCoordinates = SecondPrisoner.FindTheSquare(move.board);

	// Print the second prisoners guess for where the lucky square is!
	return Utility.printSecondPrisonerGuess(guessCoordinates, pointCoordinates);
};

if(process.argv[2])
{
	// Read in the input file and break it into lines.
	start(require('fs').readFileSync(process.argv[2],'utf-8').split('\n'));
}
else
{
	console.log("No input was provided.  Test input will be generated instead.");
	console.log("How many test trials would you like to do?")
	console.log("Enter 0 to test until a failure.");
	promptUser(function(number)
	{
		if(number !== 0)
		{
			_.times(number, function()
			{
				if(!start(Utility.generateTestInputData()))
				{
					console.log("Failure...");
					process.exit();
				}
			});
		}
		else
		{
			var success = true;
			var count = 0;
			while(success)
			{
				success = start(Utility.generateTestInputData());
				count = count + 1;
				console.log(count)
			}
		}


	});
}



