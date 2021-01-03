const path=require('path');
const express = require('express');
const http = require('http');
const {Client} = require('pg');

const connectionString = 'postgres://tujnfchbsgxwrn:151ce1735f91784ef1b15fd0d204923c5d863eb1aa2a47f8803aabeff56d0d8c@ec2-52-213-173-172.eu-west-1.compute.amazonaws.com:5432/da43g7rmjqaks6';
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');
const { fstat, writeFileSync, readFile } = require('fs');
const { response } = require('express');


const app = express();
const server = http.createServer(
    {
    key:'',
    cert: ''},
    app);

    
const io= socketio(server);
//Set static folder
app.use(express.static(path.join(__dirname, 'public')));




const client = new Client({
    user: "tujnfchbsgxwrn",
    password: "151ce1735f91784ef1b15fd0d204923c5d863eb1aa2a47f8803aabeff56d0d8c",
    database: "da43g7rmjqaks6",
    port: 5432,
    host: "ec2-52-213-173-172.eu-west-1.compute.amazonaws.com",
    ssl: true

});

client.connect();




const botname = 'Chateo';
//Run when client connects

io.on('connection', socket => {

    socket.on('joinRoom', ({username, room}) => {

        const user= userJoin(socket.id, username, room);

        socket.join(user.room);




        //Welcome current user
        socket.emit('message', formatMessage(botname, 'Welcome to Chateo'));

        //Broadcast when a user connects

        socket.broadcast.to(user.room).emit('message', formatMessage(botname,`${user.username} a rejoint le chat`));


        //send users and room info

        io.to(user.room).emit('roomUsers', {

            room: user.room,
            users: getRoomUsers(user.room)


        });


    });







//Listen for chatMessage

socket.on('chatMessage', (msg) => {

    const user = getCurrentUser(socket.id);

io.to(user.room).emit('message', formatMessage(user.username,msg));


});


//Run when client disconnects

socket.on('disconnect', () => {

    const user = userLeave(socket.id);

    if(user){


    
    io.to(user.room).emit('message', formatMessage(botname,`${user.username} a quitté le chat`));


    //send users and room info

    io.to(user.room).emit('roomUsers', {

        room: user.room,
        users: getRoomUsers(user.room)


    });

    }
    });
    

});

const PORT = process.env.PORT || 3000 ;


server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));