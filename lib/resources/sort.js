const Sort = (elm)=>{
	let str = '',
	span = null,
	icon = null;
	const orderDEFAUL = 'order-inactive'
		clase = 'with-order';
	const draw = () =>{
		str = elm.innerHTML;
		elm.className = clase;
		span = document.createElement('span');
		span.className = orderDEFAUL;
		elm.innerHTML = '';
		span.innerHTML = str;
		elm.appendChild(span);
	};
	return {
		create(){
			console.log(' mierda de colores');
			draw();
		}
	}
};

module.exports = {
	Sort
};