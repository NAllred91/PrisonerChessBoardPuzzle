// 3 sets of parity bits must be defined using 0 and 1.
exports.parityBits = [
	[0,0,0,0,1,1,1,1],
	[1,0,1,0,1,0,1,0],
	[1,1,0,0,1,1,0,0]
];

// Indicates what symbols to be used for heads and tails.
exports.heads = 'x';
exports.tails = 'o';

// Inidicates if we are counting heads or tails coins.
exports.headsOrTails = 'heads';

// Indicates if an odd or even amount is needed
// to know that the coin is in that parity bits
// row or column.
exports.oddOrEven = 'odd';

// Indicates which parity bit we are looking under.
exports.underWhich = 1;