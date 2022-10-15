const chatForm  = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');


const socket = io();

socket.on('message', message => {  // get message from server
    console.log(message);

    outputMessage(message);

    // scroll to bottom after outputing message
    chatMessages.scrollTop = chatMessages.scrollHeight;
});



// on Message subnit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;   // msg is the id of the input field in form
    // console.log(msg);

    socket.emit('chatMessage', msg);   // send form input message to server
});


// output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');  // add div class of message to newly created div
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`;
    
    chatMessages.appendChild(div);
}