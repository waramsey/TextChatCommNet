//Make Connection
var socket = io.connect('http://localhost:4000');

//Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var button = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

//Emit events

button.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

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
    console.log('outside')
    if (data.message.charAt(0) === '//') {
        console.log('Got in here.')
        bot();
    }
    output.scrollIntoView(false); //scrolls to bottom
    message.value = ''; //clears the message box
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    feedback.scrollIntoView(true); //scrolls to bottom
});


//Bot code
function bot() {
    //parse the message
    message = message.substring(1, data.message.length);
    console.log(message);
    var parsed = data.message.split(/(d-\+)+/);
    output.innerHTML += '<p><strong>DiceBot</strong>:  ' + parsed + '</p>'; //TODO Change this.
}