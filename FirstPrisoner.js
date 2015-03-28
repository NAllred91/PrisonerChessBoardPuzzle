'use strict';
var PreviousArrangements = require('./PreviousArrangements.js');
var _ = require('underscore');

var FlipACoin = function(Board, PointLocation)
{
	var colToFlip = whichRow(Board, PointLocation);
	var rowToFlip = whichRow(Board, PointLocation);

	if(!colToFlip || !rowToFlip)
	{
		console.log("First prisoner couldn't make a decision...");
		process.exit();
	}
	
	var currentOrentation = board[rowToFlip][colToFlip];

	if(currentOrentation = PreviousArrangements.heads)
	{
		board[rowToFlip][colToFlip] = PreviousArrangements.tails;
	}

	if(currentOrentation = PreviousArrangements.tails)
	{
		board[rowToFlip][colToFlip] = PreviousArrangements.heads;
	}
}

var whichRow = function(Board, PointLocation)
{

}

var whichCol = function(Board, PointLocation)
{

}

exports.FlipACoin = FlipACoin;