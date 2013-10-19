var dgram = require("dgram");

var server = dgram.createSocket("udp4");

server.on("error", function (err) {
  console.log("server error:\n" + err.stack);
  server.close();
});

server.on("message", function (msg, rinfo) {
  console.log("server got: " + msg + " from " +
    rinfo.address + ":" + rinfo.port);
});

server.on("listening", function () {
  var address = server.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});

server.bind(8118);


var readline = require('readline');



var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var mess = 'message: ';

//var dgram = require('dgram');
var client = dgram.createSocket("udp4");
client.bind(8117, "0.0.0.0");



get_message = function(){
	rl.question('What is your message: ', function(answer){
		mess = answer;
		console.log('Your message was: ' + answer);
		send_message(mess);
	});
};

send_message = function(mess){


		

	//rl.setPrompt('>>>',255);

	
		var message = new Buffer(mess);

		client.send(message, 0, message.length, 8118, "0.0.0.0", function(err, bytes){
			if(mess == '-exit'){
				client.close();
			}else{
				get_message();
			}
			
		});
	};



get_message();
