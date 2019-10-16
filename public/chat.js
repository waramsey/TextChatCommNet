//Make Connection
var socket = io.connect('http://localhost:4000');

//Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var button = document.getElementById('send');
var color = document.getElementById('colorButton');
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
    // if (data.message.charAt(0) == '/') {
    //     bot(data);
    // }
    output.scrollIntoView(false); //scrolls to bottom
    message.value = ''; //clears the message box
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    feedback.scrollIntoView(true); //scrolls to bottom
});


//Bot code
// function bot(data) {
//     //parse the message
//     try {
//         output.innerHTML += '<p><strong>Bot Got</strong>:  ' + data.message + '</p>';
        
//         var temp;
//         var numDice;
//         var roll;
//         for (var i = 0; i < data.message.length; i++) {
//             switch (data.message.charAt(i)) {
//                 case '/' : //Do nothing
//                     break;
//                 case /(\d)/ :
//                     temp += data.message.charAt(i); //TODO make sure this is adding char not int
//                     break;
//                 case 'd' :
//                     numDice = temp; //May need to parse into an integer
//                     temp = '';
//                     break;
//                 case '+' :
//                     break;
//                 case '-' :
//                     break;
//                 default:
//                     throw true;
                    
//             }
//             roll = temp * Math.random();
//         }
//         output.innerHTML += '<p><strong>DiceBot</strong>:  ' + roll + '</p>'; //TODO Change this.    
//     } catch (err) {
//         output.innerHTML += '<p><strong>DiceBot</strong>:  There was an issue with your syntax.</p>';
//     }
// }