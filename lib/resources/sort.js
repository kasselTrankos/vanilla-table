const Sort = (elm)=>{
	let str = '',
	state = 'inactive',
	span = null,
	icon = null;
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
	};
	return {
		create(){
			draw();
		}
	}
};

module.exports = {
	Sort
};