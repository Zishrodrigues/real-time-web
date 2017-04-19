(function() {
    "use strict";

    console.log('hello world');

    var socket = io();

    var app = {
        init: function() {
            console.log('init works');
            data.dataReceiver();
        }
    };

    var data = {
        dataReceiver: function() {
            socket.on('new tweet', function(data) {
                console.log(data.text);
                var tweetList = document.getElementById('tweets');
                var listItem = document.createElement('li');
                tweetList.appendChild(listItem).innerHTML=(data.text);
            });
        }
    };

    app.init();
})();
