const {getPages,
	getFirstPage,
	getMiddleFromPagination, Pages,
  	isLessThanEnd,
  	getTotalPages,
  	isInLastMiddle,
  	getButtonLastPage,
  	getElementsInThisPage,
  	getElementsFromThisPage
  } = require('./pagination');
const {Proxy}  = require('./core');
const {extend} = require('./../util/extend');


const Table = (elm) => {
	if(!elm) {
		elm = document.createElement('div');
		document.body.appendChild(elm);
	}
	const props = {
		data: [],
		counter: true,
		pagination: {
			data:{
				page:1,
				pagesShown:0,
				itemsPerPage: 0
			}
		},
		classname:['table'],
		header: [],
		table:null
	};
	const search = (e) =>{
		// console.log('ahora busca',e.detail);
	};
	const draw = () =>{
		const setKeys = () =>{
			let _return = [];
			props.header.map((elm)=>{
				_return.push(elm.name)
			});
			return _return;
		};

		const thead = () =>{
			let thead = document.createElement('thead');
			let tr = document.createElement('tr');
			thead.appendChild(tr);
			let th = null;
			// if(props.counter && 
			// 	props.header &&
			// 	props.header.length &&
			// 	props.header.length>0 &&
			//  	props.header[0].name!=='#') 
			// {
			// 	props.header.unshift({name:'#'});
			// }
			for(let i =0; i<props.header.length; i++){
				th = document.createElement('th');
				th.innerHTML = props.header[i].name;
				Proxy.make({'draw:thead:th': th});
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
		const tbody = ()=> {

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
				for(let t=0; t<keys.length; t++){
					if(props.data[i][keys[t]]){
						tr.appendChild(setTd(props.header[t], props.data[i][keys[t]]));
					}
				}
				tbody.appendChild(tr);
			}
			return tbody;
		};
		let table = props.table ||  document.createElement('table');
		table.className = props.classname.join(' ');
		if(table.getElementsByTagName("thead").length===0){
			let _thead = thead();
			Proxy.make({'draw:thead': _thead});
			table.appendChild(_thead);

		}
		if(table.getElementsByTagName("tbody").length>0){
			table.getElementsByTagName("tbody")[0].parentNode.removeChild(table.getElementsByTagName("tbody")[0]);
		}
		table.appendChild(tbody());
		if(props.table==null){
			elm.appendChild(table);
			props.table  = table;
		}
		Proxy.make({'draw:table': elm});
	};
	const redraw = function(){
		Proxy.void();
		draw();
		Proxy.run(this);
	};
	draw();
	return {

		redraw(){
			redraw.call(this);
		},
		data(data){
			if(data){
				props.data = data;
				redraw.call(this);
				return this;
			}
			return props.data;
		},
		addClass(classname){
			props.classname = classname;
			this.redraw();
			return this;
		},
		pagination(pagination){
			if(pagination){
				props.pagination = extend(props.pagination, pagination);
				redraw.call(this);
				return this;
			}
			return props.pagination;
			
		},
		header(header){
			if(props.table){
				let head = props.table.getElementsByTagName('thead');
				if(head.length>0){
					head[0].parentNode.removeChild(head[0]);
				}
			}
			props.header = header;
			redraw.call(this);
			return this;
		},
		proxy(name, cb){
			Proxy.push({proxy: name, callback: cb}, this);
			redraw.call(this);
			return this;
		}
	};
};
module.exports = {
	Table
}