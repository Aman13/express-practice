
'use strict';

function IceCream(opts) {
	this.flavor = opts.flavor;
	this.vote = 0;
}

function table() {
	var choice = [];

	choice.push(new IceCream({ flavor: 'vanilla' }));
	choice.push(new IceCream({ flavor: 'chocolate'}));
	choice.push(new IceCream({ flavor: 'mint'}));
	choice.push(new IceCream({ flavor: 'caramel'}));

	return choice;
}

module.exports = table;
