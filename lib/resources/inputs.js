const Search = (elm)=>{
	let span = null,
		input = null,
		defaultstr='buscar';
	const draw = () =>{
		span = document.createElement('span');
		span.innerHTML =  elm.innerHTML;
		elm.innerHTML = '';
		span.className = 'pam';
		span.ondblclick = putInput;
		elm.appendChild(span);
		//return span;
	};
	const putInput = (e)=>{
		const parent =e.currentTarget.parentNode;
		span.parentNode.removeChild(span);
		input = document.createElement('input');
		input.className = 'pam form-control';
		input.setAttribute('placeholder', `${defaultstr}`);
		input.onblur = blur;
		parent.appendChild(input);

	};
	const blur =(e)=>{
		if(e.currentTarget.value.length>0) search(e.currentTarget.value);
		let parent =input.parentNode;
		parent.removeChild(input);
		parent.appendChild(draw());

	};
	const search = (value)=> {
		console.log(value);
		let evt = new CustomEvent('evt:search', {detail: {str:value, node: str}});
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
