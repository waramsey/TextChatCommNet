//Make Connection
var socket = io.connect();

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
    output.scrollIntoView(false); //scrolls to bottom
    message.value = ''; //clears the message box
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    feedback.scrollIntoView(true); //scrolls to bottom
});

socket.on('roll', function(data){
    var total = data.roll + data.modifier;
    var image = '<img src="/images/AllUsers/RollDice.png" height="21" width="20"></img>';
    if (typeof data.addSub === 'undefined') {
        output.innerHTML += '<p><strong>' + image + '' + data.handle + ' Rolled: ' + data.roll + '</strong></p>';
    } else if (data.addSub === true) {
        output.innerHTML += '<p><strong>' + image + '' + data.handle + ' Rolled: ' + data.roll + '+' + data.modifier + ' = ' + total + '</strong></p>';
    } else if (data.addSub === false) {
        output.innerHTML += '<p><strong>' + image + '' + data.handle + ' Rolled: ' + data.roll + '' + data.modifier + ' = ' + total + '</strong></p>';
    }
    output.scrollIntoView(false); //scrolls to bottom
});