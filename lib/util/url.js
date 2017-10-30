const setURL = (data)=> {
	history.pushState(null, null, `/${Object.values(data).join('/')}`);
};
const getURL = ()=>{
	let _url = window.location.pathname.split('/');
	return {page: _url[1]}
};
const get = ()=>{
	let str = '';

};

module.exports  = {
	setURL,
	getURL
};