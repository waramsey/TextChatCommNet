//Make Connection
var socket = io.connect('http://localhost:8080');

//Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var button = document.getElementById('send');
var color = document.getElementById('colorButton');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');
var imgForm = document.getElementById('imgForm');

//Emit events

button.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

//TODO Is this a security issue?
// imgForm.addEventListener("submit", function() {
//     //save image
//     //add filepath to image to the database
// });

//keyup event provides a code indicating which key is pressed...
message.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        });
    }
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})


//Listen for events
socket.on('chat', function(data){
    output.innerHTML += '<p><strong>' + data.handle + '</strong>:  ' + data.message + '</p>';
    feedback.innerHTML = '';

    if (data.message.charAt(0) == '/') {
        //TODO: ASK SERVER FOR INFORMATION
        simpleDice(data);
    }

    output.scrollIntoView(false); //scrolls to bottom
    message.value = ''; //clears the message box
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    feedback.scrollIntoView(true); //scrolls to bottom
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