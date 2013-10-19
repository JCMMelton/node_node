var os = require('os');

var type = os.type();

var platform = os.platform();

var networkInterfaces = os.networkInterfaces();

if(networkInterfaces.win32){
	own_ip = networkInterfaces.win32[1].address;
	console.log('windows!!');
}else if(networkInterfaces.en1){
	own_ip = networkInterfaces.en1[1].address;
	console.log('MAC!');
};


console.log(own_ip);

console.log(type);
console.log(platform);
console.log(networkInterfaces);



//win32[1].address
//