(function() {
    "use strict";

    var socket = io();

    var app = {
        init: function() {
            console.log('App initiated :-)');
            chat.chatWorker();
        }
    };

    var chat = {
        chatWorker: function() {
            var formInput = document.getElementById('m');
            var messages = document.getElementById('messages');
            document.getElementById('chatForm').onsubmit = function() {
                var value = formInput.value;
                socket.emit('chat message', value);
                value = '';
                return false;
            };
            socket.on('chat message', function(msg) {
                var listItem = document.createElement('li');
                messages.appendChild(listItem).innerHTML=(msg);
            });
        }
    };

    app.init();
})();
