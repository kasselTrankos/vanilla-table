const Xman = () =>{
	
	return {
		set(name){
			return {
				data(data){
					Data.get()[name] = data;
					history.set(Object.assign({}, Data.get()));
				}
			}
		},
		get(position){
			return history.get(position);
		},
 		next(){
			return history.next();
		},
		position(position){
			history.position(position);
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
			return instance.data[position] || null;
		},
		next(){
			instance.position++;
			return instance.data[instance.position] || null;
		},
		position(position){
			instance.position = position;
		}
	};
})();
module.exports = {Xman}