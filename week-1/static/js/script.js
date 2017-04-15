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
                userForm.classList.add("hide");
                document.getElementById('messages').classList.remove("hide");
                document.getElementById('chatForm').classList.remove("hide");
            });
        }
    };

    var images = {
        getImage: function() {
            socket.emit('get image');
            socket.on('get image', function(img) {
                console.log('testimg');
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
            });
        }
    };

    app.init();
})();
