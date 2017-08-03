const Core = (() => {
	const proxies = [];
	const make = (data) => {
		for(let i =0; i<proxies.length; i++){
			if(proxies[i].proxy == Object.keys(data)[0]){
				proxies[i].callback(data[Object.keys(data)[0]]);
			}
		}
	};
	return {
		proxy(data){
			make(data);
		},
		push(proxy){
			proxies.push(proxy);
		}
	}
})();


module.exports = {
	Core
}