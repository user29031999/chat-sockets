var socket = io.connect('http://192.168.100.27:6677', {'forceNew':true});

socket.on('messages', function(data){
	console.log(data);
	render(data);
});

function render(data){
	var html = data.map(function(message, index){
		return (`
				<div class="message">
					<strong>${message.nickname}</strong> :
					<p>${message.text}</p>
				</div>
			`);
	}).join(' ');

	var divMessages = document.getElementById('messages');
	divMessages.innerHTML = html;
	divMessages.scrollTop = divMessages.scrollHeight;
}

function sendMessage(e){
	var payload = {
		nickname: document.getElementById('nickname').value,
		text: document.getElementById('text').value
	};

	document.getElementById('nickname').style.display = 'none';

	socket.emit('add-message', payload);

	return false;
}