/*var express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);*/

/*
app.use(express.static('client'));

app.get('/chat', function(req, res){
	res.status(200).send('Code 200');
});

var messages = [{
	id: 1, 
	text: 'Hello friend',
	nickname: 'server'
}];

io.on('connection', function(socket){
	console.log(`new connection on socket ${socket.handshake.address}`);
	socket.emit('messages', messages);
	socket.on('add-message', function(data){
		messages.push(data);
		io.sockets.emit('messages', messages);
	});
});*/

import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import db from './utils/db.js'
import session from 'express-session';
import sequelizeStore from 'connect-session-sequelize';
import createUsersController from '../server/routes/users.js';
import createAuthRoute from '../server/routes/auth.js';

const sequelize = await db();
const app = express();
const userRoute = await createUsersController(sequelize);
const authRoute = await createAuthRoute(sequelize);
const store = sequelizeStore(session.Store);
const sessionStore = new store({
	db: sequelize.connection,
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors({
	origin: "http://localhost:3000",
	methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
	credentials: true,
}));
app.use(session({
	secret: 'messaging-app',
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
}));
sessionStore.sync();

app.use('/users', userRoute);
app.use('/auth', authRoute);

app.listen(5000, function () {
	console.log('Server @localhost:5000 ready...');
});