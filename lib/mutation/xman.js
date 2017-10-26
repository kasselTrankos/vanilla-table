const Xman = () =>{
	
	return {
		set(name){
			return {
				data(data){
					Data.get()[name] = data;
					console.log(data, Data.get());
					history.set(Object.assign({}, Data.get()));
				}
			}
		},
		get(position){
			return history.get(position);
		}
 
	};
	
};
const Data = (()=>{
	let data;
	const create = ()=>{
		data = [];
	};
	return {
		get(){
			if(!data) create();
			return data;
		}
	}
})();
const history = (()=>{
	let instance;
	const create =()=>{
		instance = {
			position: 0,
			data: []
		};
	};
	return {
		set(newdata){
			if(!instance) create();
			instance.data[instance.position] = newdata;
			instance.position++;
			
		},
		get(position){
			console.log(instance.data);
			return instance.data[position];
		}
	};
})();
module.exports = {Xman}