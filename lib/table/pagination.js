// const _ =  require('lodash');
const getButtonFirstPage =(size, page, pagesShown, itemsPerPage)=>
  (getFirstPage(size, page, pagesShown, itemsPerPage)>1)
    ? [{text:'«', page:1, type:'text'}]
    : []

const getButtonPrevPage = (size, page=1, pagesShown=6, itemsPerPage=6)=>
  (getFirstPage(size, page, pagesShown, itemsPerPage)>1)
    ? [{text:'‹', page:parseInt(page)-1, type:'text'}]
    : []
const getButtonLastPage =(size, page=1, pagesShown=6, itemsPerPage=6)=>
  (isLessThanEnd(size, page, pagesShown, itemsPerPage))
  ? [{text:'»', page:getTotalPages(size, itemsPerPage), type:'text'}]
  : []

const getButtonNextPage = (size, page=1, pagesShown=6, itemsPerPage=6) =>
    (isLessThanEnd(size, page, pagesShown, itemsPerPage))
    ? [{text:'›', page:page+1, type:'text'}]
    : []


const getTotalPages = (size, itemsPerPage) =>
  Math.ceil(size/itemsPerPage)

const isLessThanEnd = (size, page=1, pagesShown=6, itemsPerPage=6)=>
  (page+getMiddleFromPagination(pagesShown))<=getTotalPages(size, itemsPerPage) &&
  getTotalPages(size, itemsPerPage)>pagesShown;


const lessThanMiddle = (page, pagesShown)=>
  (page<getMiddleFromPagination(pagesShown));

const isInLastMiddle =(size, page=1, pagesShown=6, itemsPerPage=6)=>
  (page>parseInt(getTotalPages(size, itemsPerPage)-getMiddleFromPagination(pagesShown)));

const getMiddleFromPagination =(pagesToShow=6) =>
  Math.ceil(pagesToShow/2);

///mal necesito hacer un buen test here please now!!!
const getFirstPage = (size, page=1,  pagesShown=6, itemsPerPage=6)=>
  (lessThanMiddle(page, pagesShown))
    ? 1
    : (isInLastMiddle(size, page, pagesShown, itemsPerPage))
      ? atMinium(parseInt(getTotalPages(size, itemsPerPage) - pagesShown + 1), 1)
      : atMinium(Math.ceil( page - getMiddleFromPagination(pagesShown) + 1), 1)

const atMinium = (number, minium)=>
  (number<minium)
    ? minium
    : number

const getElementsInThisPage = (size, {itemsPerPage=6, page=1})=>
  ((page*itemsPerPage)>size) ?  size : page*itemsPerPage;

const getElementsFromThisPage = (size, {itemsPerPage=6, page=1})=>
  (page-1)*itemsPerPage;

const Pages = (size, pagesShown=6, itemsPerPage=6)=>
  (pagesShown>getTotalPages(size, itemsPerPage))
    ? getTotalPages(size, itemsPerPage)
    : pagesShown

const getPages = (size, {page=1, pagesShown=6, itemsPerPage=6})=>{
  
  let buttonFirstPage = getButtonFirstPage(+size, +page, +pagesShown, +itemsPerPage);
  let buttonPrevPage  = getButtonPrevPage(+size, +page, +pagesShown, +itemsPerPage);
  let buttonLastPage  = getButtonLastPage(+size, +page, +pagesShown, +itemsPerPage);
  let buttonNextPage  = getButtonNextPage(+size, +page, +pagesShown, +itemsPerPage);
  let buttons = [].concat(buttonFirstPage, buttonPrevPage);
  for(let i =0; i< Pages(size, pagesShown, itemsPerPage); i++){
    buttons.push({
      type: 'number',
      text: getFirstPage(size, page, pagesShown, itemsPerPage)+i,
      page: getFirstPage(size, page, pagesShown, itemsPerPage)+i
    });
  }
  buttons = buttons.concat(buttonNextPage, buttonLastPage);
  return buttons;
};
const current = (()=>{
  let _page; 
  return {
    page(page){
      _page = page || _page;
      return _page || 1;
    },
    set(page){
      _page = page;
    }
  };
})();
const setCurrent = (page)=>{
  current.set(page);
};
const pagination = (elm, length, pagesShown, itemsPerPage, onPage)=>{
  elm = elm.querySelector('#pagination');
  if(elm){
    elm.parentNode.removeChild(elm);
  }
  const pages = getPages(length, {
    page: current.page(), 
    pagesShown: pagesShown, 
    itemsPerPage: itemsPerPage
  });
  // console.log(pages);
  elm = document.createElement('nav');
  elm.id ='pagination';
  let ul = document.createElement('ul'),
      li = null, 
      a = null,
      span = null;
  ul.className='pagination';

  for(let i =0; i<pages.length; i++)
  {
    li = document.createElement('li');
    a = document.createElement('a');
    a.innerHTML = pages[i].text;
    if(+pages[i].page===+current.page() && pages[i].type==='number'){
      span = document.createElement('span');
      span.className = 'sr-only';
      li.className='active';
      span.innerHTML = '(current)';
      a.appendChild(span);
    }
    //a.setAttribute('href', `/${pages[i].page}`);
    a.onclick = function(event){
      event.stopPropagation();
      current.page(pages[i].page);
      onPage(pages[i].page)
    }
    // 
    li.appendChild(a);
    ul.appendChild(li)
  }
  elm.appendChild(ul);
  return elm;
};


module.exports =  {
  getPages,
  getFirstPage,
  getMiddleFromPagination,
  Pages,
  isLessThanEnd,
  getTotalPages,
  isInLastMiddle,
  getButtonLastPage,
  getButtonFirstPage,
  getElementsInThisPage,
  getElementsFromThisPage,
  pagination,
  setCurrent
};