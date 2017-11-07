const test = require('tape'),
	{spy} = require('sinon'),
	tapSpec = require('tap-spec'),
	JSDOM = require('jsdom').JSDOM,
	fs = require('fs'),
	html = fs.readFileSync(__dirname+'/../index.html', 'utf8'),
	{Table} = require('../lib/table'),
	{Proxy} = require('../lib/table/core'),
	DOM = new JSDOM(html);

global.document = DOM.window.document;

test('Every time Table is created with no header array values', ({ok, end})=> {
	spy(Proxy, 'make');
  	Table();
  	ok(Proxy.make.callCount===2, 'Proxy.make must be called 2 times');
  	ok(global.document.getElementsByTagName("table").length>0 , 'Create a table dom');
  	ok(Object.keys(Proxy.make.getCall(0).args[0])[0]==='draw:thead', 'first call is is to draw:thead');
  	Proxy.make.restore();
  	end();
});
test('Every chain added to Table called addClass, and header', ({ok, end})=>{
	let _table = Table();
	spy(_table, 'redraw');
	spy(Proxy, 'run')
	_table.header([{name: 'op'}]).addClass(['koolo']);
	
  	ok(_table.redraw.called===true, 'redraw is called');
  	ok(Proxy.run.callCount===2, 'Proxy run is called twice, once for addClass, and other for header');

  	_table.redraw.restore();
  	Proxy.run.restore();
  	end();
});
