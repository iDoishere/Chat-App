
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

var port =  process.env.PORT || '8080' ;

http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(port);

let onlineUsers = [];
let connections = [];


io.on("connection", function (socket) {
  connections.push(socket);
  socket.on('new user', function (name, callback) {
    if (!onlineUsers.includes(name)) {
      socket.username = name;
      onlineUsers.push(socket.username);
      updateUserName() // display to all users online\offline
    }
  });

  socket.on('log out', function (data) {
    var indexToRemove = onlineUsers.indexOf(data.user);
    if (indexToRemove > -1) {
      onlineUsers.splice(indexToRemove, 1);
    }
    io.sockets.emit('get users', onlineUsers);
  })

  socket.on('disconnect', function (data) {
    console.log('disconnected')
    // onlineUsers.splice(onlineUsers.indexOf(socket.username), 1);
    // updateUserName();
    connections.splice(connections.indexOf(socket), 1)
  });

  socket.on('send message', function (data) {
    io.sockets.emit('new message',  data  )
  })

  function updateUserName() {
    io.sockets.emit('get users', onlineUsers)
  }
});

 
const usersRouter = require('./routes/users');
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());
 
app.use('/users', usersRouter);

module.exports = app;
