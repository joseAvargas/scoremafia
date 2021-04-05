const express = require('express')

const app = express();
const http = require('http').Server(app);



const path = require('path')
// import socket io library from NPM
let io = require('socket.io')(http);
let data = require('./src/fetch.js')

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/node_modules/jquery/dist/'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use(express.static(__dirname + '/src'));


// Global var that stores latest NBA data
let latestData;


// Load the NBA data for when client's first connect
// This will be updated every 10 minutes
data.getData().then((result) => {
    latestData = result;
    // console.log(latestData)
});


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
    // console.log(data.getData());
});

http.listen(3000, function(){
    console.log('HTTP server started on port 3000');
});


// create an event handler (on) using io var
// the event is to listen for a connection. Everytime a client connects to the server
io.on('connection', function(socket){
    console.log('Client connection received');
    // console.log(latestData)
    // socket.emit sends messages to the client
    socket.emit('data', latestData);


});

// refresh data
setInterval(function() {
    data.getData().then((result) => {
        // Update latest results for when new client's connect
        latestData = result;

        // send it to all connected clients
        io.emit('data', result);

        console.log('Last updated: ' + new Date());
        // console.log(latestData)
    });
}, 10000);
