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
