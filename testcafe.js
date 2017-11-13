var exec = require('child_process').exec;
exec('node ./node_modules/.bin/testcafe chromium,firefox test/**/*.e2e.js', function(error, stdout, stderr) {
    console.log(stdout);
});
