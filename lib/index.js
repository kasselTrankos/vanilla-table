import {Table} from './table';
var xmlHttp = new XMLHttpRequest();
// xmlHttp.onreadystatechange = function() { 
//     if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//         callback(xmlHttp.responseText);
// }

xmlHttp.open("GET", '/mil.json', true); // true for asynchronous 
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
	const HEADER = [{name: 'id'}, {name:'login'}];
	const table = new Table(document.getElementById('app'))
		.addClass(['table', 'table-bordered'])
		.pagination({
			data:{
				page:1,
				pagesShown: 3,
				itemsPerPage: 6
			}
		})
		.header(HEADER)
      	.data(data);
}

//https://api.github.com/users/hadley/orgs
