const chatForm  = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName  = document.getElementById('room-name');
const userList  = document.getElementById('users');


// Get username & room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true  // to ignore ?,= and other symbols
});
// console.log(username, room);

const socket = io();


// Join chatRoom
socket.emit('joinRoom', { username, room });


// Get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});


socket.on('message', message => {  // get message from server
    // console.log(message);

    outputMessage(message);  //  send back to client

    // scroll to bottom after outputing message
    chatMessages.scrollTop = chatMessages.scrollHeight;
});



// on Message subnit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;   // msg is the id of the input field in form
    // console.log(msg);

    socket.emit('chatMessage', msg);   // send form input message to server

    // clear input field after sending message
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});


// output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');  // add div class of message to newly created div
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    
    chatMessages.appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
    userList.innerHTML =  `
        ${users.map(user => `<li>${user.username}</li>`).join('')} 
    `;  // join() coz its an array
}