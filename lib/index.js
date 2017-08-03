const  {Table} = require('./table');
const  {Search} = require('./resources/inputs');
const {MapNodeFound} = require('./util/pine');
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
				pagesShown: 5,
				itemsPerPage: 10
			}
		})
		.proxy("header:draw", function(elm){
      		Search(elm).create('change',(e) => {

      			let _patterns = MapNodeFound((value)=>{
      				let _regex = new RegExp(`${e.str}`);
      				//console.log(_regex, ' pppp', _regex.test(value), value);
      				return _regex.test(value)
      			})(data);
      			console.log(_patterns);
      		});


      	})
		.header(HEADER)
      	.data(data);
};

// https://api.github.com/users/hadley/orgs
