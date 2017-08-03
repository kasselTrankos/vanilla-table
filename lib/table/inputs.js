const Search = (str, table)=>{
	let span = null,
		input = null,
		defaultstr='buscar';
	const draw = () =>{
		span = document.createElement('span');
		span.innerHTML =  str;
		span.className = 'pam';
		span.ondblclick = putInput;
		return span;
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
		table.dispatchEvent(evt);
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
