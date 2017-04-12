(function() {
    "use strict";

    var socket = io();
    socket.emit('send-nickname', 'johnny');
    var app = {
        init: function() {
            console.log('App initiated :-)');
            chat.chatWorker();
            users.userForm();
        }
    };

    var users = {
        userName: ['Anonymous'],
        userForm: function() {
            var userForm = document.getElementById('userForm');
            var username = document.getElementById('username');
            userForm.addEventListener("submit", function(e){
                e.preventDefault();
                users.userName = [];
                socket.emit('new user', username.value);
                users.userName.push(username.value);
            });
        }
    };

    var chat = {
        chatWorker: function() {
            var formInput = document.getElementById('m');
            var messages = document.getElementById('messages');
            document.getElementById('chatForm').onsubmit = function() {
                var value = formInput.value;
                var username = users.userName;
                socket.emit('chat message', value, username);
                value = '';
                return false;
            };
            socket.on('chat message', function(msg, username) {
                var listItem = document.createElement('li');
                messages.appendChild(listItem).innerHTML=(username + ' says: ' + msg);
                console.log(username + ': ' + 'message: ' + msg + ' id: ' + socket.id);
            });
        }
    };

    app.init();
})();
