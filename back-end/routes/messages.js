 
 
//socket init
// const port_1 = 8080;
// const server = app.listen(port_1, () => console.log(`listening on port ${port_1}!`))
// const io = require('socket.io')(server) ;
 
// onlineUsers = [];
// place=0; // remove user from array

// io.on("connection", async function (socket) {
//   console.log("New client connected");

// // user join and added to array.
//   socket.on('setToSocketOnLiNE', function(data){
//      if(!onlineUsers.includes(data.user)){
//       onlineUsers.push( data.user  );
//       io.emit('onlineConnect',onlineUsers);
//      }       
// });

// // listen to a req to get all users, then response is all users
// socket.on('getallusers' , function(){
//   io.emit('sendallusers',onlineUsers);
// });

// //user log out , remove user from list
// socket.on('logout', function(data){
//   var indexToRemove = onlineUsers.indexOf(data.user);
//   if (indexToRemove > -1) {
//     onlineUsers.splice(indexToRemove, 1);
//   }
//    io.sockets.emit('filter', onlineUsers);
//  })
//   // const resultAllMsg = await myServiceSocket.getAll('msg')
//   // socket.emit('allmsg',resultAllMsg) 
//   socket.on('MSG', async function(data){ 
//   //  const result = await myServiceSocket.insertOne(data, 'msg')
//       io.sockets.emit('output', data);
//     });
// });

 