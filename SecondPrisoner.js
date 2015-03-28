'use strict';
var PreviousArrangements = require('./PreviousArrangements.js');
var _ = require('underscore');

var FindTheSquare = function(Board)
{
	console.log(Board)
	// Used to narraw down where the lucky square is.
	var possibleRows = [1,2,3,4,5,6,7,8];
	var possibleColumns = [1,2,3,4,5,6,7,8];

	// The parity bits used to narrow down the search.
	var parityBitSets = PreviousArrangements.parityBits;

	// Which way should we be counting the coins?
	var coinOrientation = PreviousArrangements[PreviousArrangements.headsOrTails];

	// Do we want an odd or even amount of coins to be flipped
	// to know the lucky square is under the specified bit?
	var oddOrEven = PreviousArrangements.oddOrEven;

	// Which parity bit are we going to be counting under?
	var underWhich = PreviousArrangements.underWhich;

	// Run through each array of parity bits to narrow down
	// the possibilities.
	_.each(parityBitSets, function(parityBits)
	{
		var countedRowCoins = 0;
		var countedColCoins = 0;

		// Go through each of the bits.
		_.each(parityBits, function(bit, index)
		{
			// Only count the coins that are under the bits
			// we are concerned with.
			if(bit === underWhich)
			{
				index = index + 1;

				// See how many countable coins are in that row and column.
				var countableRowCoins = _.filter(Board.rows[index], function(coin)
				{
					return coin === coinOrientation;
				});

				var countableColCoins = _.filter(Board.columns[index], function(coin)
				{
					return coin === coinOrientation;
				});

				countedRowCoins = countedRowCoins + countableRowCoins.length;
				countedColCoins = countedColCoins + countableColCoins.length;
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

		if(countedRowCoins % 2 === modulesEquals)
		{
			_.each(parityBits, function(bit, index)
			{
				index = index + 1;

				if(bit !== underWhich)
				{
					possibleRows = _.without(possibleRows, index);
				}
			});
		}
		else
		{
			_.each(parityBits, function(bit, index)
			{
				index = index + 1;

				if(bit === underWhich)
				{
					possibleRows = _.without(possibleRows, index);
				}
			});
		}

		if(countedColCoins % 2 === modulesEquals)
		{
			_.each(parityBits, function(bit, index)
			{
				index = index + 1;

				if(bit !== underWhich)
				{
					possibleColumns = _.without(possibleColumns, index);
				}
			});
		}
		else
		{
			_.each(parityBits, function(bit, index)
			{
				index = index + 1;

				if(bit === underWhich)
				{
					possibleColumns = _.without(possibleColumns, index);
				}
			});
		}
	});

	if(possibleRows.length !== 1 && possibleColumns.length !== 1)
	{
		console.log("Second prisoner failed to determine the lucky square...");
		process.exit();
	}

	return {
		XCoord: _.first(possibleRows),
		YCoord: _.first(possibleColumns)
	}
}

exports.FindTheSquare = FindTheSquare;