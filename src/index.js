import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { onSocketConnection } from './js/socket.js';
import { AwsInstance } from './js/awsIntegreation.js';
import { MongoClientConnection } from './js/mongo.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());

const mongoClient = new MongoClientConnection();
const AWS_S3 = new AwsInstance();

const PORT = process.env.PORT || 3030;
const CLIENT_ORIGIN = '';
const DEV_CLIENT_ORIGIN = 'http://localhost:3000';

const Cors = {
  origin: [CLIENT_ORIGIN, DEV_CLIENT_ORIGIN],
  methods: ['GET', 'POST'],
};

const server = http.createServer(app, {
  cors: Cors,
});

const io = new Server(server, {
  cors: Cors,
  maxHttpBufferSize: 15e6,
});

app.get('/', (req, res) => {
  res.send('oswals');
});

app.get('/modeldata', (req, res) => {
  mongoClient.getData().then((data) => res.send(data));
});

app.get('/:class', (req, res) => {
  const Class = req.params.class;
  mongoClient.getFilteredData(Class).then((data) => res.send(data));
});

io.on('connection', (socket) => {
  onSocketConnection(socket, mongoClient, AWS_S3);
});
server.listen(PORT, () => {
  console.log(`server listening ar port ${PORT}`);
});
