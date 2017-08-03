const Search = (elm)=>{
	let span 	= null,
		input 	= null,
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
	const blur =(e)=>{
		if(e.currentTarget.value.length>0) search(e.currentTarget.value);
		input.parentNode.removeChild(input);
		draw();
	};
	const search = (value)=> {
		let evt = new CustomEvent('evt:search', {detail: {str:value}});
		elm.dispatchEvent(evt);

	};
	return  {
		create(){
			return draw();
		}
	};
};
module.exports= {
	Search
};
