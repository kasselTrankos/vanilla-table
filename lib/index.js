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
const onSearched = function(e, data, results){
	console.log(this, ' dime que existes, luego debo usar function');
	this.active((e)=>{
		for(let t=0; t<e.length; t++){
			MapNodeFound((value)=>{
				let _regex = new RegExp(`${e[t].str}`, 'gi');
				return _regex.test(value)
			})(data, (arr)=>{
				let _tmp = [];
				for(let i =0; i< arr.length; i++){
					_regex = new RegExp(`^\\[\\d+\\]\\.${e[t].field}$`, 'gi');
					if(_regex.test(arr[i]))
					{
						_tmp.push(getNodeMapped(parentNodeMap(arr[i]))(data));
					}
				}
				results = _tmp;
			});
		}
	});
	MapNodeFound((value)=>{
		let _regex = new RegExp(`${e.str}`, 'gi');
		return _regex.test(value)
	})(data, (arr)=>{
		let _tmp = [];
		for(let i =0; i< arr.length; i++){
			_regex = new RegExp(`^\\[\\d+\\]\\.${e.field}$`, 'gi');
			if(_regex.test(arr[i]))
			{
				_tmp.push(getNodeMapped(parentNodeMap(arr[i]))(results));
			}
		}
		results = _tmp;
	});
	return results;
};



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
		.proxy("header:draw:td", function(elm) {
			let _this = this;
      		Search(elm)
      		.reset(function(e){
      			_this.data(data);
      		})
      		.create('change', function(e){
      			let results = { ...data};
      			_this.data(onSearched.apply(this, [e, data, results]));
      		});
      	})
		.header(HEADER)
      	.data(data);
};

// https://api.github.com/users/hadley/orgs
