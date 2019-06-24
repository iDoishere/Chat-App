var express = require('express');
var router = express.Router();
var file = require('file-system');
var fs = require('fs');
const app = express();
 
const port_1 = 3001;
const server = app.listen(port_1, () => console.log(`listening on port ${port_1}!`))
const io = require('socket.io')(server) ;
 

// router.use(async(req,res,next)=> {
//   myService = new dbService();
//   try{
//     await myService.initDB()
//   }catch(e){
//     console.log(e)
//   }

//   next()
// })




io.on("connection", async function (socket) {
  console.log("New client connected");



  // const resultAllMsg = await myServiceSocket.getAll('msg')
  
  // socket.emit('allmsg',resultAllMsg)  

  socket.on('MSG', async function(data){ 
    console.log(data)
  //  const result = await myServiceSocket.insertOne(data, 'msg')
   
      // socket.broadcast.emit('output',data)  

      io.sockets.emit('output', data);
    });
});

module.exports = router;
