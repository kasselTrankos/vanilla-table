const Core = (() => {
	const proxies = [];
	const make = (data) => {
		let _proxies = getProxy(Object.keys(data)[0]);
		if(_proxies.length>0){
			let elm = data[Object.keys(data)[0]];
			for(let i =0; i<_proxies.length; i++){
				new _proxies[i](elm).create();
			}
		}
	};
	const getProxy = (name) =>{
		let _return =  [];
		for(let i =0; i<proxies.length; i++){
			if(proxies[i][name]){
				_return.push(proxies[i][name]);
			}
		}
		return _return;
	};
	return {
		proxy(data){
			return make(data);
		},
		push(proxy){
			proxies.push(proxy);
		}
	}
})();


module.exports = {
	Core
}