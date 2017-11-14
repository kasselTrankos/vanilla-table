const execFile = require('child_process').execFile;

const es2016 = execFile('node', ['es2016'], (error, stdout, stderr) => {
    if (error) {
        console.error('stderr', stderr);
        // exec('kill -9 $(lsof -t -i:9001 -sTCP:LISTEN)');
        // spawn("sh", ["-c", "kill -INT -"+es2016.pid]);
        // throw error;
    }
});
es2016.stdout.on('data', function(data) {
    console.log(`[1] transpile: ${data.toString()}`); 
    startServer();

});
const startServer = () => {
	const static_server = execFile('node', ['static_server'], (error, stdout, stderr) => {
	    if (error) {
	    	// spawn("sh", ["-c", "kill -INT -"+static_server.pid]);
	        // console.error('stderr', stderr.toString(), 'opo');

	        // throw error;
	    }
	});
	static_server.stdout.on('data', function(data) {
		pid  =static_server.pid;
	    console.log(`[2] sever: ${data.toString()}`); 
	});
};
