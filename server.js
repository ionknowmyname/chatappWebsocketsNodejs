const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("./utils/users");
 

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

const bot = 'ChatBot';


// When client connects
io.on('connection', socket => {
    // console.log("New WS Connection!!!");

    socket.on('joinRoom', ({ username, room }) => {

        const user = userJoin(socket.id, username, room);

        socket.join(user.room);    // join a room

        socket.emit('message', formatMessage(bot, 'Welcome to chat'));   // to a single client

        // Broadcast when user connects
        socket.broadcast
            .to(user.room)
            .emit('message', formatMessage(bot,`${user.username} has joined the chat`));
        // .broadcast sends to everyone bt the user connecting
        // io.emit() is to broadcast to all the clients including the guy joining


        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            usres: getRoomUsers(user.room)
        });

    }); 


    // catch chatMessage from client
    socket.on("chatMessage", (msg) => {
        // console.log(msg);
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg));  // send back message to client
    });


    // when client disconnects
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);

        if(user) {
            io.to(user.room).emit('message', formatMessage(bot, `${user.username} left the chat`));


            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                usres: getRoomUsers(user.room)
            });
        }
        
    });

});

//////////////////// Server start //////////////////
const PORT = 8000 || process.env.PORT;

server.listen(PORT, () => console.log(`server started on port ${PORT}`));
/////////////////////////////////////////////////////
