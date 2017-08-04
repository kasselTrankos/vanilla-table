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
	.proxy('draw:thead', function(elm){
      console.log(elm, 'header:draw:thead');
      let _this = this;
      let tr = document.createElement('tr'),
      td = document.createElement('td');
      tr.appendChild(td);
      for(let i=1; i<HEADER.length; i++){
        td = document.createElement('td');
        td.innerHTML = HEADER[i].name;
        tr.appendChild(td);
        Search(td)
              .onFilter(function(e){
                console.log(e);
                let results =  [...data];
                _this.data(onSearched.apply(this, [results, e]));
              })
              .create('change');
      }
      elm.appendChild(tr);
    })
```



This try to make a table, with :
- sorted
- search
- pagination
- ...

