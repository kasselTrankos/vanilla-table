const test = require('tape'),
	{spy} = require('sinon'),
	{getPages, getFirstPage,Pages, getTotalPages, getButtonFirstPage, isInLastMiddle} = require('../lib/table/pagination'),
	tapSpec = require('tap-spec');

test('When got 19 element, 5 pagesShown and 3 itemsPerPage', ({ok, end})=> {
	ok(Pages(19, 5, 3)===5, 'Got 5 pages visibles the limit');
	ok(Pages(10, 5, 3)===4, 'when 10 items Got 4 pages visibles the limit');
	ok(isInLastMiddle(19, 7, 5, 3)===true , ' When is page 7 is  at the end of pagination')
	ok(getButtonFirstPage(19, 3, 5, 3).length===0, 'not show button goto first page when page is 3');
	ok(getButtonFirstPage(19, 4, 5, 3).length===1, 'yes show button goto first page when page is 4');
	ok(getFirstPage(19, 3, 5, 3)===1 , 'page 1 is first when is in page 3');
	ok(getFirstPage(40, 6, 5, 3)===4 , 'page 4 is first when is in page 6');
	ok(getFirstPage(50, 6, 9, 3)===2 , 'page 2 is first when is in page 6 and pagesShown is 9');

  	end();
});
