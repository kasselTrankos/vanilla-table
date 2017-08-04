# Vanilla Table

```npm
npm i
npm start
```

And navigate to [localhost:9001](http://localhost:9001)


This is a little work with Vanilla, and emacscript 2016.

One idea is no use third party library of notbody( even my loved lodash, or jquey, or any).

Two idea is to make the components, pieces functionalities. The more sparately between.

Now you can inject to header, a search, using the resource input.search. Using the proxy, at the position "header:draw:td",
you got full access to the th ->td.
```javascript
	.proxy("header:draw:td", function(elm) {
		let _this = this;
  		Search(elm)
  		.reset(function(e){
  			let results =  [...data];
  			_this.data(onSearched.apply(this, [results]));
  		})
  		.create('change', function(e){
  			let results =  [...data];
  			_this.data(onSearched.apply(this, [results, e]));
  		});
  	})
```



This try to make a table, with :
- sorted
- search
- pagination
- ...

