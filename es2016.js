var fs = require("fs"),
	watchify = require('watchify'),
  babelify = require('babelify'),
  browserify = require("browserify");
var b = browserify({
	  plugin: [watchify],
	  entries: ["lib/index.js"],
	  cache: {},
  	debug: true,
  	packageCache: {},
})
.transform(babelify, {presets: ["es2016"], plugins: [ "transform-object-rest-spread", ["transform-class-properties", { "spec": true }]]});
b.on('update', bundle)
.bundle()
.pipe(fs.createWriteStream("build.js"));
console.info(`Created code at ${new Date().toISOString()}`);
function bundle(err){
    if(err) {
      console.info(`Error ${err} at ${new Date().toISOString()}`);  
      return false
    }
  	console.debug(`Updated code at ${new Date().toISOString()}`);
  	b.bundle().pipe(fs.createWriteStream("build.js"));
  }