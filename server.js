
var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("My socket server is running");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('new connection: ' + socket.id)

    socket.on('mouse', mouseMsg);
    socket.on('/ZIGSIM/kyamisukegram/touch01', iosMsg);
    socket.on('pads', controllerMsg);

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
        console.log(data);
    }

    function iosMsg(data) {
        socket.broadcast.emit('ZIGSIM/kyamisukegram/touch01', data);
        console.log(data);
    }

    function controllerMsg(data) {
        socket.broadcast.emit('pads', data);
        console.log(data);
    }


}
