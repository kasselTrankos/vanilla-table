const  {Table} = require('./table');
const  {Search} = require('./resources/inputs');
const {MapNodeFound, getNodeMapped, parentNodeMap} = require('./util/pine');
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

      			let results = []
      			MapNodeFound((value)=>{
      				let _regex = new RegExp(`${e.str}`);
      				// console.log(_regex, ' pppp', value, _regex.test(value));
      				return _regex.test(value)
      			})(data, (arr)=>{
      				for(let i =0; i< arr.length; i++){
      					_regex = new RegExp(`^\\[\\d+\\]\\.${e.field}$`);
      					if(_regex.test(arr[i])){
      						results.push(getNodeMapped(parentNodeMap(arr[i]))(data));
      					}
      				}
      				// return _r;
      			});
      			this.data(results);
      			console.log(results);
      		});


      	})
		.header(HEADER)
      	.data(data);
};

// https://api.github.com/users/hadley/orgs
