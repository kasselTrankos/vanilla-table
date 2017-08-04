const Search = (elm)=>{
	const stateSEARCHING = 'searching',
		stateSEARCHED = 'searched';
	let span 	= null,
		_this = null,
		onevt	=  'blur',
		state = 'searching',
		input 	= null,
		callback=null,
		str  	= elm.innerHTML,
		defaultstr='buscar';
	const activeSearchs = () =>{
		let result = [];
		let ths = elm.parentNode.getElementsByTagName('th');
		for(let i=0; i<ths.length; i++){
			if(ths[i].hasAttribute('data-state') &&
				ths[i].getAttribute('data-state')==stateSEARCHED)
			{
				let states = JSON.parse(ths[i].getAttribute('data-searched'));
				if(states.field!==str){
					result.push(states);
				}

			}
		}
		return result;
	};
	const draw = () => {
		span = document.createElement('span');
		span.innerHTML =  str;
		elm.innerHTML = '';
		span.className = 'pam';
		span.ondblclick = putInput;
		elm.appendChild(span);
	};
	const setPreviousValue = () =>{
		if(elm.hasAttribute('data-state') &&
			elm.getAttribute('data-state')==stateSEARCHED){
			input.value = JSON.parse(elm.getAttribute('data-searched')).str;
		}

	};
	const putInput = (e)=>{
		const parent =e.currentTarget.parentNode;

		span.parentNode.removeChild(span);
		input = document.createElement('input');
		input.className = 'pam form-control';
		input.setAttribute('placeholder', `${defaultstr}`);
		input.onblur = onBlur;
		if(onevt=='change')input.addEventListener('input', onInput);
		setPreviousValue();
		parent.appendChild(input);
		elm.setAttribute('data-state', stateSEARCHING);
		input.focus();
	};
	const publish =(value)=>{
		elm.setAttribute('data-state', stateSEARCHED);
		elm.setAttribute('data-searched', JSON.stringify({str: value, field: str}));
		callback.apply(_this, [{str: value, field: str}]);
	}
	const onInput = (e) =>{
		publish(e.currentTarget.value);
	};
	const onBlur =(e) => {
		input.parentNode.removeChild(input);
		if(callback &&
			e.currentTarget.value.length>0 &&
			onevt=='blur'
		){
			publish(e.currentTarget.value);
		}
		if(elm.getAttribute('data-state')===stateSEARCHING){
			elm.removeAttribute('data-state');
		}
		draw();
	};
	return  {
		active(callback){
			callback.apply(this, [activeSearchs()])
			return this;
		},
		create(evt, cb){
			onevt = evt;
			callback = cb;
			_this = this;
			draw();
			return this;
		}
	};
};
module.exports= {
	Search
};
