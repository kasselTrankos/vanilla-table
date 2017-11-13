var exec = require('child_process').exec;
exec('node ./node_modules/.bin/tape test/**/*.test.js | ./node_modules/.bin/tap-spec', function(error, stdout, stderr) {
    console.log(stdout);
});
