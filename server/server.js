const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) =>{
	console.log('New User connected');

    socket.emit('newMessage', {
    	from:"Admin",
	 	text:"Welcome to the chat app",
	 	createdAt:new Date().getTime()
	})



    socket.broadcast.emit('newMessage', {
	    from:"Admin",
	 	text:"New user joined",
	 	createdAt:new Date().getTime()

    })

    


	




	socket.on('disconnect', (socket) =>{
	console.log('User disconnected');
	
	});




	socket.on('createMessage', (newMessage) =>{
	console.log('New message create',newMessage);
	io.emit('newMessage', {
		from:newMessage.from,
		text:newMessage.text,
		createdAt:new Date().getTime()
	// socket.broadcast.emit('newMessage', {
	// 	from:newMessage.from,
	// 	text:newMessage.text,
	//  	createdAt:new Date().getTime()
	 })
		
	});
});






server.listen(port, () => {
	console.log(`Server is up on ${port}`)
})

// console.log(__dirname + '/../public');
// console.log(publicPath);
