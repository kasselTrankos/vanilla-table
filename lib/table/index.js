const {Proxy}  = require('./core');
const Table = (elm) => {
	if(!elm) {
		elm = document.createElement('div');
		document.body.appendChild(elm);
	}
	const props = {
		data: [],
		classname:['table'],
		header: []
	};
	const addContent = (tbody, data, startPage, endPage)=>{
		const setKeys = () =>{
			return props.header.map((elm)=> elm.name);
		};
		const setTd = (node, value) =>{
			let td = document.createElement('td');
			if(node.type==='image'){
				/** global: Image */
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
		var tr=null, 
			keys = setKeys();
		while(tbody.firstChild) {
		  tbody.removeChild(tbody.firstChild);
		}
		for(let i = startPage;
			i<endPage;
			i++)
		{
			if(!data[i]) {
				continue;
			}
			tr = document.createElement('tr');
			for(let t=0; t<keys.length; t++){
				if(data[i][keys[t]]){
					tr.appendChild(setTd(props.header[t], data[i][keys[t]]));
				}
			}
			tbody.appendChild(tr);
		}
	};
	const draw = ()=> {
		const thead = () =>{
			let thead = document.createElement('thead');
			let tr = document.createElement('tr');
			thead.appendChild(tr);
			var th = null;
			for(let i =0; i<props.header.length; i++){
				th = document.createElement('th');
				th.innerHTML = props.header[i].name;
				Proxy.make({'draw:thead:th': th});
				tr.appendChild(th);
			}
			return thead;
		};
		const tbody = ()=> {
			let tbody = document.createElement('tbody');
			Proxy.make({'draw:tbody': tbody});
			return tbody;
		};
		let table = elm.getElementsByTagName('TABLE')[0] ||  document.createElement('table');
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
		if(!elm.getElementsByTagName('TABLE')[0]){
			elm.appendChild(table);
		}
		Proxy.make({'draw:table': elm});
	};
	const redraw = function(){
		Proxy.void();
		draw();
		Proxy.run(this);
	};
	return {

		redraw(){
			redraw.call(this);
		},
		addContent(tbody, data, startPage, endPage){
			addContent(tbody, data, startPage, endPage)
			return this;
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
			redraw.call(this);
			return this;
		},
		header(header){
			if(elm.getElementsByTagName('TABLE')[0] ){
				let head = elm.getElementsByTagName('TABLE')[0].getElementsByTagName('thead');
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