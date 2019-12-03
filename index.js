var express = require('express');
var socket = require('socket.io');


//App setup
var app = express();
var server = app.listen(80, function(){ //listening at port 4000
    console.log('listening to requests on port 4000');
});


//Static files (what will be displayed on webpage)
app.use(express.static('public'));


//Socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('made socket connection', socket.id);

    socket.on('chat', function(data){ //Check in here if I have a bot command
        //var output = document.getElementById('output');
        io.sockets.emit('chat', data); //sockets refers to ALL connected sockets
        if (data.message.charAt(0) == '/') {
            simpleDice(data);
        }
    });

    socket.on('typing', function(data){
       socket.broadcast.emit('typing', data);  //broadcasting sends the data to every OTHER client socket
    });
});


//Dice Bot Code
function simpleDice(data) {
    
    var cmdLength = data.message.length; //length of the command
    var i = 1; //position in the command

    var numDice = "";
    var typeDice = "";
    var modifier = "";
    var addSub; //true if addition, false if subtraction
    

    while (i < cmdLength && data.message.charAt(i) != 'd') {
        numDice += data.message.charAt(i);
        i++;
    }

    i++; //moves past 'd'

    while (i < cmdLength && data.message.charAt(i) != '+' && data.message.charAt(i) != '-') {
        typeDice += data.message.charAt(i);
        i++;
    }

    if (data.message.charAt(i) == '+') {
        addSub = true;
    } else if (data.message.charAt(i) == '-') {
        addSub = false;
    }

    while (i < cmdLength) {
        modifier += data.message.charAt(i);
        i++;
    }

    var numDice = parseInt(numDice);
    var typeDice = parseInt(typeDice);
    var modifier = parseInt(modifier);

    var roll = 0;
    for (var i = 0; i < numDice; i++) {
        roll += Math.ceil(typeDice * Math.random());
    }

    if (typeof addSub === 'undefined') {
        //do nothing :)
    } else if (addSub === true) {
        output.innerHTML += '<p><strong>DiceBot</strong>:  Rolled: ' + roll + '+' + modifier + '</p>';
        roll += modifier;
    } else if (addSub === false) {
        output.innerHTML += '<p><strong>DiceBot</strong>:  Rolled: ' + roll + '' + modifier + '</p>';
        roll += modifier;
    }

    output.innerHTML += '<p><strong>DiceBot</strong>:  Total: ' + roll + '</p>';
}