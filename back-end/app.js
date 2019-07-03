
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')



  var port =  process.env.PORT || '8080' ;
// var app = express();
// var server = app.listen(port);

// var io = require('socket.io').listen(server);
 
http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(port);

// const port_1 = 8080;
// const app = express();
// // const server = require('http').Server(app);
// var http = require('http');
// var server = http.createServer(app);
// server.listen(port);
// const io = require('socket.io')(server)
// const server = app.listen(port_1, () => console.log(`listening on port ${port_1}!`))
// const io = require('socket.io').listen(server);

let onlineUsers = [];
let connections = [];


io.on("connection", function (socket) {

  connections.push(socket);

  console.log('connected %s', connections.length)

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
    onlineUsers.splice(onlineUsers.indexOf(socket.username), 1);
    updateUserName();
    connections.splice(connections.indexOf(socket), 1)
  });

  socket.on('send message', function (data) {
    console.log(data)
    io.sockets.emit('new message',  data  )
  })

  function updateUserName() {
    io.sockets.emit('get users', onlineUsers)
  }
});

// const messagesRouter = require('./routes/messages');
const usersRouter = require('./routes/users');
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
 
app.use(cors());
// app.use('/messages', messagesRouter);
app.use('/users', usersRouter);

module.exports = app;
