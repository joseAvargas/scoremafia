// import getApiData from 'scripts.js'

// const PORT = process.env.PORT || 3000;

var socket = io();

socket.on('data', function(data) {
    
    getApiData(data);
});
