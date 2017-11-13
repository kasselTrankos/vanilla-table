var exec = require('child_process').exec;
exec('node es2016', function(error, stdout, stderr) {
    console.log(stdout);
});
exec('node static_server', function(error, stdout, stderr) {
    console.log(stdout);
});
exec('node tape', function(error, stdout, stderr) {
    console.log(stdout);
});
exec('node testcafe', function(error, stdout, stderr) {
    console.log(stdout);
});
