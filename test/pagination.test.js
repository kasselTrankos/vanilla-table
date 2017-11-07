const test = require('tape'),
	{spy} = require('sinon'),
	{getPages, Pages, getTotalPages, getButtonFirstPage} = require('../lib/table/pagination'),
	tapSpec = require('tap-spec');

test('When got 19 element, when 5 pagesShown and 3 itemsPerPage', ({ok, end})=> {
	let pages = getPages(19, 5, 3);
	ok(pages.length===4, 'Got 4 pages');
	ok(getButtonFirstPage(19, 3, 5, 3).length===0, 'not show button goto first page when page is 3');
	ok(getButtonFirstPage(19, 4, 5, 3).length===1, 'yes show button goto first page when page is 4');
  	end();
});
