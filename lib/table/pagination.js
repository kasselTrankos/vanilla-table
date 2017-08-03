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




const getPages =(size, {page=1, pagesShown=6, itemsPerPage=6})=>{
  let buttonFirstPage = getButtonFirstPage(size, page, pagesShown, itemsPerPage);
  let buttonPrevPage  = getButtonPrevPage(size, page, pagesShown, itemsPerPage);
  let buttonLastPage  = getButtonLastPage(size, page, pagesShown, itemsPerPage);
  let buttonNextPage  = getButtonNextPage(size, page, pagesShown, itemsPerPage);
  let buttons = [];
  if(buttonFirstPage.length>0){
    buttons.push(buttonFirstPage[0]);
  }
  if(buttonPrevPage.length>0){
    buttons.push(buttonPrevPage[0]);
  }
  for(let i =0; i<Pages(size, pagesShown, itemsPerPage); i++){
    buttons.push({
      type: 'number',
      text: getFirstPage(size, page, pagesShown, itemsPerPage)+i,
      page: getFirstPage(size, page, pagesShown, itemsPerPage)+i
    });
  }
  // let buttons =  _.range(Pages(size, pagesShown, itemsPerPage)).map(
  //   (item)=> {
  //   return {
  //     type: 'number',
  //     text: getFirstPage(size, page, pagesShown, itemsPerPage)+item,
  //     page: getFirstPage(size, page, pagesShown, itemsPerPage)+item
  //   }});
  if(buttonNextPage.length>0){
    buttons.push(buttonNextPage[0]);
  }
  if(buttonLastPage.length>0){
    buttons.push(buttonLastPage[0]);
  }
  return buttons;
  // return _.concat(buttonFirstPage, buttonPrevPage,
  //   buttons, buttonNextPage, buttonLastPage);
}



module.exports =  {
  getPages,
  getFirstPage,
  getMiddleFromPagination,
  Pages,
  isLessThanEnd,
  getTotalPages,
  isInLastMiddle,
  getButtonLastPage,
  getElementsInThisPage,
  getElementsFromThisPage
}