var express = require('express');
var socket = require('socket.io');

//App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening to requests on port 4000');
});//listening at port 4000


//Static files (what will be displayed on webpage)
app.use(express.static('public'));


//Socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('made socket connection', socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data); //sockets refers to ALL connected sockets
    });

    socket.on('typing', function(data){
       socket.broadcast.emit('typing', data);  //broadcasting sends the data to every OTHER client socket
    });
});