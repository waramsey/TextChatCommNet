var express = require('express');
var socket = require('socket.io');


//App setup
var app = express();
var server = app.listen(8080, function(){ //listening at port 4000
    console.log('listening to requests on port 8080');
});
const path = require("path");

//Static files (what will be displayed on webpage)
app.use(express.static(path.join(__dirname,"public")));







//Socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('made socket connection', socket.id);

    socket.on('chat', function(data){ //Check in here if I have a bot command
        io.sockets.emit('chat', data); //sockets refers to ALL connected sockets
        if (data.message.charAt(0) == '/') {
            simpleDice(data);//can we make output a string and send it back?
        }
    });

    socket.on('typing', function(data){
       socket.broadcast.emit('typing', data);  //broadcasting sends the data to every OTHER client socket
    });
});