'use strict';
var PreviousArrangements = require('./PreviousArrangements.js');
var _ = require('underscore');

var FlipACoin = function(Board, PointLocation)
{
	Board = _.clone(Board)
	var colToFlip = whichSet(Board.columns, PointLocation.XCoord);
	var rowToFlip = whichSet(Board.rows, PointLocation.YCoord);

	if(!colToFlip || !rowToFlip)
	{
		console.log("First prisoner couldn't make a decision...");
		process.exit();
	}

	console.log(colToFlip)
	console.log(rowToFlip)

	var currentOrentation = Board.rows[rowToFlip][colToFlip - 1];
	console.log(currentOrentation)

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
	return Board
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

	var isUnderSets = [];
	var notUnderSets = [];
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
				notUnderSets.push(parityBits);
			}
			else
			{
				isUnderSets.push(parityBits);
			}
			
		}
		else
		{
			if(parityBits[PointLocation - 1] === underWhich)
			{
				isUnderSets.push(parityBits);
			}
			else
			{
				notUnderSets.push(parityBits);
			}
		}
	});

	return pickParityBitToChange(isUnderSets, notUnderSets, underWhich);
}

var pickParityBitToChange = function(isUnderSets, notUnderSets, underWhich)
{
	var couldBe = [];
	var cantBe = [];
	console.log(isUnderSets)
	console.log(notUnderSets)

	_.each(isUnderSets, function(isUnder)
	{
		_.each(isUnder, function(orientation, index)
		{
			if(orientation === underWhich)
			{
				couldBe.push(index);
			}
			else
			{
				cantBe.push(index);
			}
		});
	});

	_.each(notUnderSets, function(notUnder)
	{
		_.each(notUnder, function(orientation, index)
		{
			if(orientation === underWhich)
			{
				cantBe.push(index);
			}
			else
			{
				couldBe.push(index);
			}
		});
	});

	couldBe = _.uniq(couldBe);
	cantBe = _.uniq(cantBe);
	var toChange = _.difference(couldBe, cantBe);

	if(toChange.length === 1)
	{
		return _.first(toChange) + 1;
	}
}

exports.FlipACoin = FlipACoin;