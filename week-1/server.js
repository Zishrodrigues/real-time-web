var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/index');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
      console.log('user disconnected');
  });
});

http.listen(3007, function(){
  console.log('listening on 3007');
});
