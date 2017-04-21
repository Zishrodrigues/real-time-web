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

    socket.on('choose word', function(word){
        console.log(word[0]);
        var startTime = new Date().getTime();
        var timeOut = setTimeout(function(){
            if(new Date().getTime() - startTime > 5000){
                setTimeout(timeOut);
                return;
            }
            streamData(word[0]);  //testing timeouts with streaming data - work in progress
        }, 2000);
    });

    socket.on('disconnect', function(){
        console.log('Bi bi : <');
    });
});

function streamData(word) {
    client.stream('statuses/filter', {track: word},  function(stream) {
        stream.on('data', function(tweet) {
            console.log(tweet.text);
             io.emit('new tweet', tweet);
        });

        stream.on('error', function(error) {
            console.log(error);
        });
    });
}

http.listen(3007, function(){
  console.log('listening on 3007');
});
