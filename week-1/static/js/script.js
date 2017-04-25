(function() {
    "use strict";

    var socket = io();

    var config = {
        elements: {
            userForm:  document.getElementById('userForm'),
            username: document.getElementById('username'),
            startGame: document.getElementById('playButton'),
            guessed: document.getElementById('guessed'),
            guessedPopout: document.getElementById('guessedPopout'),
            messages: document.getElementById('messages'),
            chatForm: document.getElementById('chatForm'),
            mainImg: document.getElementById('mainImg')
        }
    };

    var app = {
        init: function() {
            console.log('App initiated :-)');
            chat.chatWorker();
            chat.master();
            users.userForm();
            game.getImage();
            game.guessedNext();
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
                config.elements.messages.classList.remove("hide");
                config.elements.chatForm.classList.remove("hide");
                config.elements.mainImg.classList.remove("hide");
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

    var game = {
        getImage: function() {
            // var imageNumber = Math.floor(Math.random() * 1050) + 1;
            // socket.emit('get image', imageNumber);
            socket.on('get image', function(img) {
                console.log(img);
                document.getElementById("image").src = img;
            });
        },
        startGame: function() {
            var imageNumber = Math.floor(Math.random() * 1050) + 1;
            socket.emit('get image', imageNumber);
            game.guessed();
        },
        guessed: function() {
            config.elements.startGame.classList.add('hide');
            config.elements.guessed.classList.remove('hide');
            config.elements.guessed.addEventListener("click", function(){
                var imageNumber = Math.floor(Math.random() * 1050) + 1;
                socket.emit('guessed'); //emit click..?
                console.log('Been guessed!');
            });
        },
        guessedNext: function() {
            socket.on('guessed', function() {
                console.log('keksd');
                document.getElementById("image").src = '';
                config.elements.guessedPopout.classList.add('guessedPopout');
                setTimeout(function(){
                    var imageNumber = Math.floor(Math.random() * 1050) + 1;
                    socket.emit('get image', imageNumber);
                    config.elements.guessedPopout.classList.remove('guessedPopout');
                }, 4000);
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
            // socket.emit('set master', 'master');
            socket.on('set master', function(master) {
                console.log(master + ' ur king m8');
                document.getElementById('image').classList.remove('zoomed');
                config.elements.startGame.classList.remove('hide');
                config.elements.startGame.addEventListener("click", function(){
                    game.startGame();
                    console.log('clicked start game');
                });
            });
            socket.on('master announce', function(master) {
                console.log(master + ' is master');
            });
        }
    };

    app.init();
})();
