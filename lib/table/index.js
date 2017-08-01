import {getPages, getFirstPage, 
	getMiddleFromPagination, Pages,
  	isLessThanEnd,
  	getTotalPages, 
  	isInLastMiddle, 
  	getButtonLastPage,
  	getElementsInThisPage
  }

   from './pagination';
import {extend} from './../util/extend'
const Table = (elm)=>{
	const props = {
		data: [],

		pagination: {
			current: 1,
			className: ['Page', 'navigation'],
			ulClassName: ['pagination'],
			data:{
				page:1,
				pagesShown:0,
				itemsPerPage: 0
			}
		},
		classname:['table'],
		header: [{name: 'vacio'}],
		table:null
	};
	const draw =()=>{
		if(props.table){
			props.table.parentNode.removeChild(props.table)
		}
		const setKeys = () =>{
			let _return = [];
			props.header.map((elm)=>{
				_return.push(elm.name)
			});
			return _return;
		};
		const pagination = ()=>{
			const pages = getPages(props.data.length, ...props.pagination.data);
			let nav = document.createElement('nav');
			nav.className = props.pagination.className.join(' ');
			let ul = document.createElement('ul');
			ul.className = props.pagination.ulClassName.join(' ');
			let li=null, a=null;
			for(let i =0; i<pages.length; i++){
				li = document.createElement('li');
				a = document.createElement('a');
				a.setAttribute('href', `#${pages[i].page}`);
				a.innerHTML = pages[i].text;
				li.appendChild(a);
				ul.appendChild(li)
			}
			nav.appendChild(ul);
			return nav;
			
		};
		const thead = () =>{
			let thead = document.createElement('thead');
			let tr = document.createElement('tr');
			thead.appendChild(tr);
			let th = null;
			for(let i =0; i<props.header.length; i++){
				th = document.createElement('th');
				th.innerHTML = props.header[i].name;
				tr.appendChild(th);
			}
			return thead;
		};
		const tbody = ()=>{
			
			let tbody = document.createElement('tbody');
			
			let tr=null, td = null, keys = setKeys();
			console.log(props.pagination.data, 'hasta donde lleg4o');
			for(let i = props.pagination.current; 
				i<=getElementsInThisPage(props.data.length, props.pagination.data); 
				i++)
			{
				tr = document.createElement('tr');
				for(let t=0; t<keys.length; t++){
					if(props.data[i][keys[t]]){
						td = document.createElement('td');
						td.innerHTML = props.data[i][keys[t]];
						tr.appendChild(td);
					}
				}
				tbody.appendChild(tr);
			}
			return tbody;
		};
		let table = document.createElement('table');
		table.className = props.classname.join(' ');
		table.appendChild(thead());
		table.appendChild(tbody());
		elm.appendChild(table);
		if(props.pagination.data.itemsPerPage>0 && props.data.length>0){
			elm.appendChild(pagination());
		}
		props.table  = table;
	};
	draw();
	return {
		data(data){
			props.data = data;
			draw();
			return this;
		},
		addClass(classname){
			props.classname = classname;
			draw();
			return this;
		},
		pagination(pagination){
			props.pagination = extend(props.pagination, pagination);
			draw();
			return this;	
		},
		header(header){
			props.header = header;
			draw();
			return this;
		}
	};
};
module.exports = {
	Table
}