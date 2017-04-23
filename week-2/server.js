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
        streamData(word[0]);
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
        setTimeout(function(){
            console.log('stopped');
            stream.destroy(); //stream disconnects after 10 seconds 
        },10000);
    });
}

http.listen(3007, function(){
  console.log('listening on 3007');
});
