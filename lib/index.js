import {Table} from './table';
import {Search} from './resources/inputs';
var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", 'https://api.github.com/users/hadley/orgs', true); // true for asynchronous
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

const callback = (data)=>{
	const HEADER = [
	{name: 'id'},
	{name:'login'},
	{name: 'repos_url', type: 'link'}/*,
	{name: 'avatar_url', type:'image'}*/];
	const table = new Table(document.getElementById('app'))
		.addClass(['table', 'table-bordered'])
		.pagination({
			data:{
				page:1,
				pagesShown: 3,
				itemsPerPage: 5
			}
		})
		.proxy("header:draw", (elm)=>{
      		new Search(elm).create();
      	})
		.header(HEADER)
      	.data(data);
}

//https://api.github.com/users/hadley/orgs
