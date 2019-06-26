var express = require('express');
var router = express.Router();
var file = require('file-system');
var fs = require('fs');
const app = express();
 
const port_1 = 3001;
const server = app.listen(port_1, () => console.log(`listening on port ${port_1}!`))
const io = require('socket.io')(server) ;
 

onlineUsers = [];



io.on("connection", async function (socket) {
  console.log("New client connected");


  socket.on('setToSocketOnLiNE', function(data){
   console.log( 'asdlknas')
    if(!onlineUsers.includes(data.user)){
      console.log(data.user);
      onlineUsers.push({username:data.user });
      console.log(onlineUsers);
      io.emit('onlineConnect',onlineUsers);
    }

});
  // const resultAllMsg = await myServiceSocket.getAll('msg')
  
  // socket.emit('allmsg',resultAllMsg)  

  socket.on('MSG', async function(data){ 
 
  //  const result = await myServiceSocket.insertOne(data, 'msg')
   
      // socket.broadcast.emit('output',data)  

      io.sockets.emit('output', data);
    });
});

module.exports = router;
