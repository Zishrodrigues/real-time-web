(function() {
    "use strict";

    var socket = io();

    var config = {
        elements: {
            userForm:  document.getElementById('userForm'),
            username: document.getElementById('username'),
            kek: 'test'
        }
    };

    var app = {
        init: function() {
            console.log('App initiated :-)');
            chat.chatWorker();
            users.userForm();
            images.getImage();
        }
    };

    var users = {
        userName: ['Anonymous'],
        userForm: function() {
            var userForm = config.elements.userForm;
            var username = config.elements.username;
            userForm.addEventListener("submit", function(e){
                e.preventDefault();
                users.userName = [];
                socket.emit('new user', username.value);
                users.userName.push(username.value);
                userForm.classList.add("hide");
                document.getElementById('messages').classList.remove("hide");
                document.getElementById('chatForm').classList.remove("hide");
                document.getElementById('mainImg').classList.remove("hide");
                chat.master();
                users.userNames();
            });
        },
        userNames: function() {
            socket.on('usernames', function(data) {
                var userList = document.getElementById('currentUsers');
                var html = '';
                var usersArr = [];
                var amountList = document.createElement('ul');
                var i;
                for(i = 0; i < data.length; i++) {
                    html += '<li class="list-group-item">'+data[i]+'</li>';
                    usersArr.push(data[i].length);
                    var amount = usersArr.length;
                    amountList.append(amount);
                    var getOnlineUsers = document.getElementById('onlineUsers');
                    getOnlineUsers.innerHTML = 'Online users: ' + amount;
                }
                userList.innerHTML = html;
            });
        }
    };

    var images = {
        getImage: function() {
            var imageNumber = Math.floor(Math.random() * 1050) + 1;
            socket.emit('get image', imageNumber);
            socket.on('get image', function(img) {
                console.log(img);
                document.getElementById("image").src = img;
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
        },
        master: function() {
            socket.emit('set master', 'master');
            socket.on('set master', function(master) {
                console.log(master + ' ur king m8');
                document.getElementById('image').classList.remove('zoomed');
            });
        }
    };

    app.init();
})();
