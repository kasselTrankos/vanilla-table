import {Table} from './table';
var xmlHttp = new XMLHttpRequest();
// xmlHttp.onreadystatechange = function() { 
//     if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//         callback(xmlHttp.responseText);
// }

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
	{name: 'repos_url', type: 'link'}, 
	{name: 'avatar_url', type:'image'}];
	const table = new Table(document.getElementById('app'))
		.addClass(['table', 'table-bordered'])
		.pagination({
			data:{
				page:1,
				pagesShown: 3,
				itemsPerPage: 2
			}
		})
		.header(HEADER)
      	.data(data);
}

//https://api.github.com/users/hadley/orgs
