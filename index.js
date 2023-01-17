const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let i = 0;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('new conexion:  user ' + i + ' connected');

    socket.nom = i;
    i++;

    socket.on('disconnect', () => {
        console.log('user ' + socket.nom + ' disconnected');
    });
});

io.on('connection', (socket) => {
    socket.on('coordinates', (coord) => {
        console.log('User "' + socket.nom + '" coordinates: ' + coord.coordinateX + ' (X), ' + coord.coordinateY + ' (Y)');
        io.emit('coordinates', { id: socket.nom, coordinateX: coord.coordinateX, coordinateY: coord.coordinateY, color: coord.color, username: coord.username });
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});