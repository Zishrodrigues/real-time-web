var express = require('express');
var app = express();
var request = require('request');
require('dotenv').config();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twitter = require('twitter');

var consumerKey = process.env.CONSUMERKEY;
var consumerSecret = process.env.CONSUMERSECRET;
var accessToken = process.env.ACCESSTOKEN;
var tokenSecret = process.env.ACCESSTOKENSECRET;
var users = {};

app.use(express.static('static'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', function (req, res) {
    res.render('pages/index');
});

var client = new Twitter({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token_key: accessToken,
    access_token_secret: tokenSecret
});

io.on('connection', function(socket){
    console.log('Hey there!');

    socket.on('new user', function(name){
        socket.nickname = name;
        users[socket.nickname] = socket;
        io.emit('nicknames', Object.keys(users));
    });

    socket.on('new score', function(score){
        if (!socket.nickname) return;
        delete users[socket.nickname];
        socket.nickname = score;
        users[socket.nickname] = score;
        console.log( Object.keys(users));
        io.emit('nicknames', Object.keys(users));
    });

    socket.on('choose word', function(word){
        console.log(word[0]);
        streamData(word[0]);
    });

    socket.on('results popup', function(result){
        socket.broadcast.emit('results popup', result);
    });

    socket.on('disconnect', function(){
        console.log('Bi bi : <');
        if (!socket.nickname) return;
        delete users[socket.nickname];
        io.emit('nicknames', Object.keys(users));
    });

    function streamData(word) {
        client.stream('statuses/filter', {track: word},  function(stream) {
            stream.on('data', function(tweet) {
                console.log(tweet.text);
                socket.emit('new tweet', tweet);
            });

            stream.on('error', function(error) {
                console.log(error);
                socket.emit('stream error', error);
            });

            setTimeout(function(){
                socket.emit('stream stopped', function() {
                    console.log('emit testi');
                });
                console.log('test streamstop');
                stream.destroy();
            },5000);
        });
    }

});

http.listen(3007, function(){
  console.log('listening on 3007');
});
