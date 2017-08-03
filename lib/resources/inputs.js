const Search = (elm)=>{
	let span 	= null,
		onevt	=  'blur',
		input 	= null,
		callback=null,
		str  	= elm.innerHTML,
		defaultstr='buscar';
	const draw = () => {
		span = document.createElement('span');
		span.innerHTML =  str;
		elm.innerHTML = '';
		span.className = 'pam';
		span.ondblclick = putInput;
		elm.appendChild(span);
	};
	const putInput = (e)=>{
		const parent =e.currentTarget.parentNode;
		span.parentNode.removeChild(span);
		input = document.createElement('input');
		input.className = 'pam form-control';
		input.setAttribute('placeholder', `${defaultstr}`);
		if(onevt=='blur')input.onblur = onBlur;
		if(onevt=='change')input.addEventListener('input', onChange);
		parent.appendChild(input);
		input.focus();
	};
	const publish =(value)=>{
		callback.apply(null, [{str: value, field: str}]);
	}
	const onChange = (e) =>{
		console.log('on iput');
		publish(e.currentTarget.value);
	};
	const onBlur =(e) => {
		console.log(' why herre?');
		input.parentNode.removeChild(input);
		if(callback &&
			e.currentTarget.value.length>0
		){
			publish(e.currentTarget.value);
		}
		draw();
	};
	// const search = (value)=> {
	// 	let evt = new CustomEvent('evt:search', {detail: {str:value}});
	// 	elm.dispatchEvent(evt);
	// };
	return  {
		create(evt, cb){
			onevt = evt;
			callback = cb;
			draw();
			return this;
		}
	};
};
module.exports= {
	Search
};
