const  {Table} = require('./table');
const  {Search} = require('./resources/search');
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
const searching = function(regexStr, regexNode, results) {
	MapNodeFound((value)=>{
		let _regex = new RegExp(regexStr, 'gi');
		return _regex.test(value)
	})(results, (arr)=>{
		let _tmp = [];
		for(let i =0; i< arr.length; i++){
			_regex = new RegExp(regexNode, 'gi');
			if(_regex.test(arr[i]))
			{
				_tmp.push(getNodeMapped(parentNodeMap(arr[i]))(results));
			}
		}
		results = _tmp;
	});
	return results;
}
const onSearched = function(results, evt=null){
	this.active((e)=>{
		console.log(e, 'active was');
		for(let t=0; t<e.length; t++){
			results = searching.apply(this, [`${e[t].str}`, `^\\[\\d+\\]\\.${e[t].field}$`, results]);
		}
	});
	if(evt){
		results = searching.apply(this, [`${evt.str}`, `^\\[\\d+\\]\\.${evt.field}$`, results]);
	}
	return results;
};



const callback = (data)=>{
	const HEADER = [
	{name: 'company'},
	{name:'name'},
	{name: 'gender'},
	{name: 'phone'}/*,
	{name: 'avatar_url', type:'image'}*/];
	const table = Table(document.getElementById('app'))
		.addClass(['table', 'table-bordered'])
		.data(data)
		.pagination({
			data:{
				page:1,
				pagesShown: 5,
				itemsPerPage: 10
			}
		})
		.proxy('draw:thead', function(elm){
			let _this = this;
			let tr = document.createElement('tr'),
			td = document.createElement('td');
			tr.appendChild(td);
			for(let i=1; i<HEADER.length; i++){
				td = document.createElement('td');
				td.innerHTML = HEADER[i].name;
				tr.appendChild(td);
				Search(td)
		      		.onFilter(function(e){
		      			let results =  [...data];
		      			_this.data(onSearched.apply(this, [results, e]));
		      		})
		      		.create('change');
			}
			elm.appendChild(tr);
		})
		.header(HEADER);
};

// https://api.github.com/users/hadley/orgs
