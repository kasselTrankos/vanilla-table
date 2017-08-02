const Search = (str)=>{
	let span = null,
		defaultstr='buscar';
	const draw = ()=>{
		span = document.createElement('span');
		span.innerHTML =  str;
		span.className = 'pam';
		span.ondblclick = putInput;
		return span;
	};
	const putInput = (e)=>{
		const parent =e.currentTarget.parentNode;
		span.parentNode.removeChild(span);
		let input = document.createElement('input');
		input.className = 'pam form-control';
		input.setAttribute('placeholder', `${defaultstr}`);
		parent.appendChild(input);
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