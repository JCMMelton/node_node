var http = require('http');

var readline = require('readline');



var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var mess = 0000;
var body = '8118';


rl.question('What is your message: ', function(answer){
		mess = answer;
		body = answer;
		start_serv(body);
		//console.log('Your message was: ' + answer);
	});


function start_serv(body){
	http.createServer(function(request, response){
		response.writeHead(200,{'Content-Length': body.length, 'Content-Type': 'text/plain', 'Content': body });
		//response.write('hello\n', 'utf-8');
		response.end('Hello World\n');
	}).listen(8818);

	console.log('Server running at http://127.0.0.1:8818/');

};

//start_serv(body);
// rl.question('What is your message: ', function(answer){
// 		mess = answer;
// 		body = answer;
// 		start_serv(body);
// 		//console.log('Your message was: ' + answer);
// 	});