const {Table} = require('./table');
const {Search} = require('./resources/search');
const {Sort} = require('./resources/sort');
const {Xman} = require('./mutation/xman');
const {setURL, getURL} = require('./util/url');
const { 
	getElementsFromThisPage,
	getElementsInThisPage,
	gotoPage,
	getPages} = require('./table/pagination');
const {MapNodeFound, getNodeMapped, parentNodeMap} = require('./util/pine');
var xmlHttp = new XMLHttpRequest();
/** global: XMLHttpRequest */
xmlHttp.open("GET", '/demos.json', true); // true for asynchronous
xmlHttp.onreadystatechange = function () {
  if (xmlHttp.readyState === 4) {
    if (xmlHttp.status === 200) {
      callback(JSON.parse(xmlHttp.responseText));
    } else {
      console.error(xmlHttp.statusText);
    }
  }
};
let PAGE = getURL().page;
const PAGESSHOWN = 5,
	ITEMSPERPAGE =5;
Xman().set('pages').data([1,2,2]);
Xman().set('pagesd').data({table:[1,2,222]});
Xman().set('vera').data('alfre');
Xman().set('tigre').data('tigreono');
// console.log(Xman().get(12), Xman().position(0), Xman().next());
Xman().remove('pagesd');
Xman().position(0);
xmlHttp.send(null);
const searching = function(regexStr, regexNode, results) {
	MapNodeFound((value)=>{
		let _regex = new RegExp(regexStr, 'gi');
		return _regex.test(value)
	})(results, (arr)=>{
		let _tmp = [];
		for(let i =0; i< arr.length; i++){
			let _regex = new RegExp(regexNode, 'gi');
			if(_regex.test(arr[i]))
			{
				_tmp.push(getNodeMapped(parentNodeMap(arr[i]))(results));
			}
		}
		results = _tmp;
	});
	return results;
}
const onSearched = function(results, evt = null){
	this.active((e)=>{
		for(let t=0; t<e.length; t++){
			results = searching.apply(this, [`${e[t].str}`, `^\\[\\d+\\]\\.${e[t].field}$`, results]);
		}
	});
	if(evt){
		results = searching.apply(this, [`${evt.str}`, `^\\[\\d+\\]\\.${evt.field}$`, results]);
	}
	return results;
};
const Order = function(results) {
	this.active(()=>{
	});
};

const pagination = (elm, length, pagesShown, itemsPerPage, onPage)=>{
  elm = elm.querySelector('#pagination');
  let ul;
  if(!elm){
    elm = document.createElement('nav');
    elm.id ='pagination';
    ul = document.createElement('ul');
    elm.appendChild(ul);
  }
  ul = elm.getElementsByTagName('UL')[0];
  const draw = ()=> {
    const pages = getPages(length, {
      page: PAGE, 
      pagesShown: pagesShown, 
      itemsPerPage: itemsPerPage
    });
    let li = null, 
        a = null,
        span = null;
    ul.className='pagination';
    while(ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
    for(let i =0; i<pages.length; i++)
    {
      li = document.createElement('li');
      a = document.createElement('a');
      a.innerHTML = pages[i].text;
      if(+pages[i].page===+PAGE && pages[i].type==='number'){
        span = document.createElement('span');
        span.className = 'sr-only';
        li.className='active';
        span.innerHTML = '(current)';
        a.appendChild(span);
      }
      a.onclick = function(event){
        event.stopPropagation();
        PAGE = pages[i].page;
        draw();
        onPage(pages[i].page);
      }
      li.appendChild(a);
      ul.appendChild(li);
    }
  };
  draw();
  return elm;
};

//history.pushState(null, null, '/1');
const callback = (data)=>{
	const HEADER = [
		{name: 'company'},
		{name:'name'},
		{name: 'email'},
		// {name: 'gender'},
		{name: 'phone'}/*,
		{name: 'avatar_url', type:'image'}*/
	];
	Table(document.getElementById('app'))
		.addClass(['table', 'table-bordered'])
		.data(data)
		.proxy('draw:thead:th', function(elm){
			let _this = this;
			Sort(elm).create().onOrdered(function(order){
				let results = [..._this.data()];
				Order.apply(this, [results]);
			});
		})
		.proxy('draw:tbody', function(elm){
			this.addContent(
				elm, 
				this.data(), 
				getElementsFromThisPage(this.data().length, 
				{
					page: PAGE,
					pagesShown: PAGESSHOWN,
					itemsPerPage: ITEMSPERPAGE
				}),
				getElementsInThisPage(this.data().length, 
				{
					page: PAGE,
					pagesShown: PAGESSHOWN,
					itemsPerPage: ITEMSPERPAGE
				}) 
			);
		})
		.proxy('draw:table', function(elm){
			let _this = this;
			elm.insertBefore(
			pagination(
				elm, 
				_this.data().length, 
				PAGESSHOWN, 
				ITEMSPERPAGE,
				function(page){
					setURL({page:page});
					let tbody = elm.getElementsByTagName('TBODY')[0];
					_this.addContent(
						tbody, 
						_this.data(), 
						getElementsFromThisPage(_this.data().length, 
						{
							page: page,
							pagesShown: PAGESSHOWN,
							itemsPerPage: ITEMSPERPAGE
						}),
						getElementsInThisPage(_this.data().length, 
						{
							page: page,
							pagesShown: PAGESSHOWN,
							itemsPerPage: ITEMSPERPAGE
						}) 
					);
				})
			, elm.firstChild);
		})
		.proxy('draw:thead', function(elm){
			let _this = this,
			tr = document.createElement('tr'),
				td = null;
			for(let i=0; i<HEADER.length; i++){
				td = document.createElement('td');
				td.innerHTML = HEADER[i].name;
				tr.appendChild(td);
				Search(td).onFilter(function(e){
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
