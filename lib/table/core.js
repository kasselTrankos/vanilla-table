const Proxy = (() => {
	let _this = null;
	const proxies = [];
	const make = (data) => {
		for(let i =0; i<proxies.length; i++){
			if(proxies[i].proxy == Object.keys(data)[0]){
				// console.log(_this, ' joder aki si existe!!');
				proxies[i].callback.call(_this, data[Object.keys(data)[0]]);
				//(data[Object.keys(data)[0]]);
			}
		}
	};
	return {
		make(data){
			make(data);
		},
		push(proxy, table){
			_this = table;
			proxies.push(proxy);
		}
	}
})();


module.exports = {
	Proxy
}