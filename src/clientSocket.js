var socket = io();

socket.on('data', function(data) {

    getApiData(data);
});
