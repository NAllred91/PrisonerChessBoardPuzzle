'use strict';
var PreviousArrangements = require('./PreviousArrangements.js');
var _ = require('underscore');

var FlipACoin = function(Board, PointLocation)
{
	Board = _.clone(Board)
	var colToFlip = whichSet(Board.columns, PointLocation.YCoord);
	var rowToFlip = whichSet(Board.rows, PointLocation.XCoord);

	if(!colToFlip || !rowToFlip)
	{
		console.log("First prisoner couldn't make a decision...");
		process.exit();
	}

	var currentOrentation = Board.rows[rowToFlip][colToFlip - 1];

	if(currentOrentation === PreviousArrangements.heads)
	{
		Board.rows[rowToFlip][colToFlip - 1] = PreviousArrangements.tails;
		Board.columns[colToFlip][rowToFlip - 1] = PreviousArrangements.tails;
	}
	else if(currentOrentation === PreviousArrangements.tails)
	{
		Board.columns[colToFlip][rowToFlip - 1] = PreviousArrangements.heads;
		Board.rows[rowToFlip][colToFlip - 1] = PreviousArrangements.heads;
	}

	return {
		board: Board,
		coordinates: {
			XCoord: rowToFlip,
			YCoord: colToFlip
		}
	};
}

var whichSet = function(input, PointLocation)
{
	// The parity bits used to narrow down the search.
	var parityBitSets = PreviousArrangements.parityBits;

	// Which way should we be counting the coins?
	var coinOrientation = PreviousArrangements[PreviousArrangements.headsOrTails];

	// Do we want an odd or even amount of coins to be flipped
	// to know the lucky square is under the specified bit?
	var oddOrEven = PreviousArrangements.oddOrEven;

	// Which parity bit are we going to be counting under?
	var underWhich = PreviousArrangements.underWhich;

	var correctParity = [];
	var incorrectParity = [];
	_.each(parityBitSets, function(parityBits)
	{
		var countedCoins = 0;

		// Go through each of the bits.
		_.each(parityBits, function(bit, index)
		{
			// Only count the coins that are under the bits
			// we are concerned with.
			if(bit === underWhich)
			{
				index = index + 1;

				// See how many countable coins are in that row and column.
				var countableCoins = _.filter(input[index], function(coin)
				{
					return coin === coinOrientation;
				});

				countedCoins = countedCoins + countableCoins.length;
			}
		});

		var modulesEquals;

		if(oddOrEven === 'odd')
		{
			modulesEquals = 1;
		}
		else if(oddOrEven === 'even')
		{
			modulesEquals = 0;
		}
		else
		{
			console.log("Previous arrangements must include 'odd' or 'even'...");
			process.exit();
		}

		if(countedCoins % 2 === modulesEquals)
		{
			if(parityBits[PointLocation - 1] === underWhich)
			{
				correctParity.push(parityBits);
			}
			else
			{
				incorrectParity.push(parityBits);
			}
			
		}
		else
		{
			if(parityBits[PointLocation - 1] === underWhich)
			{
				incorrectParity.push(parityBits);
			}
			else
			{
				correctParity.push(parityBits);
			}
		}
	});

	return pickParityBitToChange(correctParity, incorrectParity, underWhich);
}

var pickParityBitToChange = function(correctParity, incorrectParity, underWhich)
{
	var cantBe = [];
	var mustBe = [];

	_.each(correctParity, function(isCorrect)
	{
		_.each(isCorrect, function(orientation, index)
		{
			if(orientation === underWhich)
			{
				cantBe.push(index);
			}
		});
	});

	_.each(incorrectParity, function(notCorrect)
	{
		var hasToChange = [];
		_.each(notCorrect, function(orientation, index)
		{
			if(orientation === underWhich)
			{
				hasToChange.push(index);
			}
			else
			{
				cantBe.push(index);
			}
		});
		mustBe.push(hasToChange);
	});

	var compactedMustBe = [];

	_.each(mustBe, function(array)
	{
		if(compactedMustBe.length === 0)
		{
			compactedMustBe = array;
		}
		else
		{
			compactedMustBe = _.intersection(compactedMustBe, array);
		}
	});

 	cantBe = _.uniq(cantBe);
 	var toChange = _.difference(compactedMustBe, cantBe);

	if(toChange.length === 1)
	{
		return _.first(toChange) + 1;
	}

	if(toChange.length === 0)
	{
		return _.first(_.difference([0,1,2,3,4,5,6,7], cantBe)) + 1
	}
}

exports.FlipACoin = FlipACoin;