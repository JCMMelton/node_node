var os = require('os');

var networkInterfaces = os.networkInterfaces();
if(networkInterfaces.address){
	own_ip = networkInterfaces.address;
}else if(networkInterfaces.en1){
	own_ip = networkInterfaces.en1[1].address;
}
//console.log(networkInterfaces.en1[1].address);

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
  // console.log("server listening " +
  //     address.address + ":" + address.port);
});

server.bind(8118, own_ip);


var readline = require('readline');


var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var mess = 'message: ';

//var dgram = require('dgram');
var client = dgram.createSocket("udp4");
client.bind(8119, own_ip);

//192.168.1.36

target_ip = new Array;

get_target = function(){
	//console.log('get_message');
	rl.question('Enter a target, if target list complete enter (done): ', function(answer){
		if(answer == 'done'){
			get_message(target_ip);
		}else{
		target_ip.push(answer);
		chat_func();
		};
		
	});
	
}


get_message = function(){

	rl.question('What is your message: ', function(answer){
		mess = answer;
		//console.log('Your message was: ' + answer+ "\n");
		send_message(mess);
	});
};

send_message = function(mess){


		var message = new Buffer(mess);


	//rl.setPrompt('>>>',255);
		for(var i = 0; i<target_ip.length; i++){
			try{
				//target_ip = '192.168.1.'+i.toString();
				if(target_ip != own_ip){
				
					client.send(message, 0, message.length, 8118, target_ip[i]);
					};
				 }catch(er){
				 	console.log('transmit failed');
				 };
			};
			
		
	
		
		
			if(mess == '-exit'){
				client.close();
				process.kill();
			}else{
				get_message();
			};
			
		
	};

chat_func = function(){
		//get_message();
		get_target();
		
};

// get_message();
chat_func();


