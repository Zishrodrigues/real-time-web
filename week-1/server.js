var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = [];

app.use(express.static('static'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/index');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('chat message', function(msg, username){
        io.emit('chat message', msg, username);
    });
    socket.on('new user', function(user){
        io.emit('new user', user);
        console.log(user + 'id: ' + socket.id);
    });
});

http.listen(3007, function(){
  console.log('listening on 3007');
});
