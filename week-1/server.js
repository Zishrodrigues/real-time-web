var express = require('express');
var app = express();
var request = require('request');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = {};

app.use(express.static('static'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', function (req, res) {
    res.render('pages/index');
});

io.on('connection', function(socket){
    console.log(Object.keys(users));
    socket.on('chat message', function(msg, username){
        io.emit('chat message', msg, username);
    });

    socket.on('new user', function(user){
        socket.username = user;
        // clients.push(socket.username);
        users[socket.username] = socket;
        io.emit('new user', user);
        io.emit('usernames', Object.keys(users));
        setMaster();
        console.log(Object.keys(users));
    });

    socket.on('get image', function(imageNumber){
        var img = 'https://unsplash.it/800/500?image=' + imageNumber;
        io.emit('get image', img);
    });

    socket.on('disconnect', function(){
        if (!socket.username) return;
        delete users[socket.username];
    //   clients.splice(clients.indexOf(socket.username), 1);
        console.log(Object.keys(users));
        io.emit('usernames', Object.keys(users));
        setMaster();
    });

    function setMaster() {
        var first = Object.keys(users)[0];
        if(Object.keys(users).length > 0) {
            users[first].emit('set master', first);
        }
    }
});

http.listen(3007, function(){
  console.log('listening on 3007');
});
