const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const port_1 = 3001;


const messagesRouter = require('./routes/messages');
const usersRouter = require('./routes/users');

const app = express();
const http = require("http");

// const server = app.listen(port_1, () => console.log(`listening on port ${port_1}!`))

// const io = require('socket.io')(server) ;
 

// io.on("connection", socket => {
//   console.log("New client connected");
 
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });



//   socket.on('MSG',function(data){   
   
    
//       socket.emit('output',data.message)  
  

//     });
  
    
// });


// const getApiAndEmit = async socket => {
//     try {
//       socket.emit("message", {ido:555}); // Emitting a new message. It will be consumed by the client
//     } catch (error) {
//       console.error(`Error: ${error.code}`);
//     }
//   };




  
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



const corsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    preflightContinue: true,
    maxAge: 600,
  };


app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use('/messages', messagesRouter);
app.use('/users', usersRouter);

module.exports = app;
