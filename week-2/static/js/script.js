(function() {
    "use strict";

    var socket = io();

    var config = {
        numberCount: document.getElementById('numberCount'),
        wordForm: document.getElementById('wordForm'),
        inputWord: document.getElementById('inputWord')
    };

    var app = {
        init: function() {
            data.dataInput();
        }
    };

    var data = {
        dataInput: function() {
            config.wordForm.addEventListener("submit", function(e){
                e.preventDefault();
                var chosenWord = [];
                chosenWord.push(config.inputWord.value);
                socket.emit('choose word', chosenWord);
                data.dataReceiver();
            });
        },
        dataReceiver: function() {
            socket.on('new tweet', function(data) {
                var tweetList = document.getElementById('tweets');
                var listItem = document.createElement('li');
                tweetList.appendChild(listItem).innerHTML=(data.text);
                game.tweetCounter(data.text);
            });
        }
    };

    var game = {
        tweetNumber: [],
        tweetCounter: function(tweets) {
            game.tweetNumber.push(tweets);
            console.log(game.tweetNumber.length);
            config.numberCount.innerText=game.tweetNumber.length;
        }
    };

    app.init();
})();
