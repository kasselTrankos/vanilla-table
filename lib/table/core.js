const Proxy = (() => {
	let callers = [];
	const proxies = [];
	const make = (data) => {
		for(let i =0; i<proxies.length; i++){
			if(proxies[i].proxy === Object.keys(data)[0]){
				callers.push({
					type: Object.keys(data)[0],
					callback: proxies[i].callback,
					data: data[Object.keys(data)[0]]
				});
			}
		}
	};
	const call = (_this) =>{
		for(let i=0; i<callers.length; i++){
			callers[i].callback.apply(_this, [callers[i].data]);
		}
	};
	return {
		void(){
			callers.length = 0;
		},
		make(data){
			make(data);
		},
		run(_this){
			call(_this)
		},
		push(proxy, table){
			proxies.push(proxy);
		}
	}
})();
const UID = (()=>{

	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });

})();

module.exports = {
	Proxy,
	UID
}