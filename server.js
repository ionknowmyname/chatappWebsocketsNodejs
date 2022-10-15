const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
 

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', socket => {
    // console.log("New WS Connection!!!");

    socket.emit('message', 'Welcome to chat');   // to a single client

    // Broadcast when user connects
    socket.broadcast.emit('message', 'A user has joined the chat');
    // .broadcast sends to everyone bt the user connecting
    // io.emit() is to broadcast to all the clients including the guy joining

    // when client disconnects
    socket.on("disconnect", () => {
        io.emit('message', 'A user left the chat')
    })

    // catch chatMessage from client
    socket.on("chatMessage", (msg) => {
        // console.log(msg);

        io.emit('message', msg);  // send back message to client
    });
})

//////////////////// Server start //////////////////
const PORT = 8000 || process.env.PORT;

server.listen(PORT, () => console.log(`server started on port ${PORT}`));
/////////////////////////////////////////////////////
