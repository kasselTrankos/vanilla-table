const Sort = (elm)=>{
	let str = '',
		state = 'inactive',
		span = null,
		icon = null,
		_this = null,
		_onOrderCallback = null;
	const orderDEFAUL = 'order-inactive',
		orderASC = 'order-asc',
		orderDESC = 'order-desc',
		clase = 'with-order';
	const draw = () =>{
		str = elm.innerHTML;
		elm.className = clase;
		span = document.createElement('span');
		span.className = orderDEFAUL;
		elm.innerHTML = '';
		span.innerHTML = str;
		elm.appendChild(span);
		span.onclick = changeOrder
	};
	const changeOrder = ()=>{
		if(state=='inactive' ||
			state == 'desc'){
			state = 'asc';
			span.className = orderASC;

		}else{
			state = 'desc';
			span.className = orderDESC;
		}
		make();
	};
	const make = () =>{
		if(_onOrderCallback){
			_onOrderCallback.call(_this, span.className);
		}
	};
	const activeSorts = () =>{
		let _results = [];
		let ths = elm.parentNode.getElementsByTagName('th');
		console.log(ths);
		for(let i =1; i<ths.length; i++){
			let _span = ths[i].getElementsByTagName('span')[0];
			if(_span.className!=='order-inactive') {
				_results.push({
					field: _span.innerHTML,
					order: _span.className.split('-')[1]
				});
			}
		}
		return _results;
	};
	return {
		onOrdered(callback) {
			_onOrderCallback = callback;
		},
		active (callback){
			callback.apply(this, [activeSorts()]);
			return this;
		},
		create(){
			draw();
			_this = this;
			return this;
		}
	}
};

module.exports = {
	Sort

};