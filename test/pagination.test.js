const test = require('tape'),
	{spy} = require('sinon'),
	{getPages, Pages, getTotalPages} = require('../lib/table/pagination'),
	tapSpec = require('tap-spec');

test('When got 19 element, in page 1 and 5 pagesShown and 3 itemsPerPage', ({ok, end})=> {
	let pages = getPages(19, 5, 3);
	console.log(pages.length);
	ok(pages.length===4, 'Got 4 pages')
  	end();
});
