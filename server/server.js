const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http')
const {generateMessage} = require('./utils/message')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) =>{
	console.log('New User connected');

    socket.emit('newMessage', generateMessage("Admin","Welcome to the chat app"))


    socket.broadcast.emit('newMessage', generateMessage("Admin","New user joined"))
    


	




	socket.on('disconnect', (socket) =>{
	console.log('User disconnected');
	
	});




	socket.on('createMessage', (newMessage, callback) =>{
	console.log('New message create',newMessage);
	io.emit('newMessage', generateMessage(newMessage.from,newMessage.text))
	callback('This is from the server'); 
		
	});
});






server.listen(port, () => {
	console.log(`Server is up on ${port}`)
})

// console.log(__dirname + '/../public');
// console.log(publicPath);
