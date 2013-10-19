var http = require('http');

var readline = require('readline');



var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var hits = new Array();

for(var i=0;i<1000;i++){
	var opt = {
		hostname: '192.168.1.'+i.toString(),
		port: 8818
	};
	http.get(opt, function(res){
		console.log("got response: " + res.statusCode);
		res.setEncoding(encoding = 'utf-8');
		/*res.on('data', function(chunk){
			hits.push('message was: '+chunk);
		});*/
		hits.push('hit at  '+opt.hostname);
		hits.push('hit said: '+res.headers.content);
		console.log(res.headers);
		console.log(res.trailers);
		//hits.push('said: '+res.trailers);
		console.log("hits: ", hits);
		//console.log("was: " + res.end);
		//http.close();
	}).on('error', function(e){
		//console.log("got error: " + e.message);
		//http.close();
	});

};
rl.question('What is your message: ', function(answer){
		mess = answer;
		console.log('Your message was: ' + answer+ "\n");
		//send_message(mess);
		if(mess == "-exit"){
			process.kill();
		}
	});
/*console.log(hits);
process.kill();*/