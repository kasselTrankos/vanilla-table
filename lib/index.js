const  {Table} = require('./table');
const  {Search} =require('./resources/inputs');
const esnode = require('esnode');
var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", 'demos.json', true); // true for asynchronous
xmlHttp.onreadystatechange = function (e) {
  if (xmlHttp.readyState === 4) {
    if (xmlHttp.status === 200) {
      callback(JSON.parse(xmlHttp.responseText));
    } else {
      console.error(xmlHttp.statusText);
    }
  }
};
xmlHttp.send(null);
let r = 0;
const callback = (data)=>{
	const HEADER = [
	{name: 'company'},
	{name:'name'},
	{name: 'gender'}/*,
	{name: 'avatar_url', type:'image'}*/];
	const table = Table(document.getElementById('app'))
		.addClass(['table', 'table-bordered'])
		.pagination({
			data:{
				page:1,
				pagesShown: 3,
				itemsPerPage: 5
			}
		})
		.proxy("header:draw", function(elm){
      		Search(elm).create((e) => {
      			console.log(e);
      			let results = []
      			let _f = esnode(this.data()).query(e.field, function(value, obj){
					if(value===e.str) results.push(obj);
				});
				console.log(_f);
      			this.data(results)
      		});

      	})
		.header(HEADER)
      	.data(data);
}

// https://api.github.com/users/hadley/orgs
