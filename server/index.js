var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/chat', function(req, res){
	res.status(200).send('Code 200');
});

var messages = [{
	id: 1, 
	text: 'Hello friend',
	nickname: 'server'
}];

io.on('connection', function(socket){
	console.log(`new connection on socket ${socket.handshake.address}`);
	socket.emit('messages', messages);
	socket.on('add-message', function(data){
		messages.push(data);
		io.sockets.emit('messages', messages);
	});
});

server.listen(6677, function(){
	console.log('Server @localhost:6677 ready...');
});