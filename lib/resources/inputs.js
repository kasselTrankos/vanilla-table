const Search = (elm)=>{
	let span 	= null,
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
		input.onblur = blur;
		parent.appendChild(input);
		input.focus();
	};
	const blur =(e) => {
		input.parentNode.removeChild(input);
		if(callback && e.currentTarget.value.length>0){
			callback.apply(null, [e.currentTarget.value]);
		}
		draw();
	};
	// const search = (value)=> {
	// 	let evt = new CustomEvent('evt:search', {detail: {str:value}});
	// 	elm.dispatchEvent(evt);
	// };
	return  {
		create(cb){
			callback = cb;
			draw();
			return this;
		}
	};
};
module.exports= {
	Search
};
