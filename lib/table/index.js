import {getPages, getFirstPage,
	getMiddleFromPagination, Pages,
  	isLessThanEnd,
  	getTotalPages,
  	isInLastMiddle,
  	getButtonLastPage,
  	getElementsInThisPage,
  	getElementsFromThisPage
  }
from './pagination';
import {Core} from './core';
import {extend} from './../util/extend';


const Table = (elm) => {


	const props = {
		data: [],
		counter: true,
		pagination: {
			elm: null,
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
	elm.addEventListener('evt:search', (e)=>search(e), false);
	const search = (e) =>{
		console.log('ahora busca',e.detail);
	};
	const draw = () =>{
		if(props.table){
			props.table.parentNode.removeChild(props.table);
		}

		const setKeys = () =>{
			let _return = [];
			props.header.map((elm)=>{
				_return.push(elm.name)
			});
			return _return;
		};

		const pagination = ()=>{
			if(props.pagination.elm){
				props.pagination.elm.parentNode.removeChild(props.pagination.elm);
			}
			const pages = getPages(props.data.length, props.pagination.data);
			props.pagination.elm = document.createElement('nav');
			props.pagination.elm.className = props.pagination.className.join(' ');
			let ul = document.createElement('ul');
			ul.className = props.pagination.ulClassName.join(' ');
			let li=null, a=null;
			for(let i =0; i<pages.length; i++)
			{
				li = document.createElement('li');
				a = document.createElement('a');
				a.setAttribute('href', `#${pages[i].page}`);
				a.onclick = function(event){
					event.stopPropagation();
				    gotoPage(pages[i].page)
				}
				a.innerHTML = pages[i].text;
				li.appendChild(a);
				ul.appendChild(li)
			}
			props.pagination.elm.appendChild(ul);
			return props.pagination.elm;

		};
		const gotoPage = (page) =>{
			props.pagination.data.page = page;
			draw();

		};
		const thead = () =>{
			let thead = document.createElement('thead');
			let tr = document.createElement('tr');
			thead.appendChild(tr);
			let th = null;
			if(props.counter  && props.header[0].name!=='#') {
				props.header.unshift({name:'#'});

			}
			for(let i =0; i<props.header.length; i++){
				//let ts = new Search(props.header[i].name, elm).create();
				th = document.createElement('th');
				th.innerHTML = props.header[i].name;
				Core.proxy({'header:draw': th});
				//th.append(ts);
				tr.appendChild(th);
			}
			return thead;
		};
		const setTd = (node, value) =>{
			let td = document.createElement('td');

			if(node.type==='image'){
				let image = new Image();
				image.src =  value;
				image.className = 'image img-rounded';
				td.appendChild(image);
			}else if(node.type==='link'){
				let a = document.createElement('a');
				a.setAttribute('href', value);
				a.setAttribute('target', 'blank');
				a.innerHTML = value;
				td.appendChild(a);
			}else{
				td.innerHTML = value;
			}
			return td;
		};
		const tbody = ()=>{
			let tbody = document.createElement('tbody');
			let tr=null, td = null, keys = setKeys();
			for(let i = getElementsFromThisPage(props.data.length, props.pagination.data);
				i<getElementsInThisPage(props.data.length, props.pagination.data);
				i++)
			{
				if(!props.data[i]) {
					continue;
				}
				tr = document.createElement('tr');
				if(props.header[0].name==='#'){
					td = document.createElement('td');
					td.innerHTML = String(i);
					tr.appendChild(td);
				}
				for(let t=0; t<keys.length; t++){
					if(props.data[i][keys[t]]){
						tr.appendChild(setTd(props.header[t], props.data[i][keys[t]]));
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
		},
		proxy(name, cb){
			Core.push({proxy: name, callback: cb});
			console.log('value', name);
			draw();
			return this;
		}
	};
};
module.exports = {
	Table
}