var dgram = require("dgram");

var server = dgram.createSocket("udp4");

server.on("error", function (err) {
  console.log("server error:\n" + err.stack);
  server.close();
});

server.on("message", function (msg, rinfo) {
  console.log("server got: " + msg + " from " +
    rinfo.address + ":" + rinfo.port+ "\n");
});

server.on("listening", function () {
  var address = server.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});

server.bind(8118,"192.168.1.22");


var readline = require('readline');


var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var mess = 'message: ';

//var dgram = require('dgram');
var client = dgram.createSocket("udp4");
client.bind(8119, "192.168.1.22");

//192.168.1.36

var target_ip='';

get_target = function(){
	rl.question('What is your target: ', function(answer){
		target_ip = answer;
		//console.log('Your message was: ' + answer+ "\n");
		get_message(target_ip);
	});
	
}


get_message = function(target_ip){
	rl.question('What is your message: ', function(answer){
		mess = answer;
		//console.log('Your message was: ' + answer+ "\n");
		send_message(mess, target_ip);
	});
};

send_message = function(mess, target_ip){


		

	//rl.setPrompt('>>>',255);

	
		var message = new Buffer(mess);

		client.send(message, 0, message.length, 8118, target_ip, function(err, bytes){
			if(mess == '-exit'){
				client.close();
				process.kill();
			}else{
				get_message(target_ip);
			}
			
		});
	};

chat_func = function(){
	
		get_target();
		
};


chat_func();


