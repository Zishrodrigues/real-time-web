(function() {
    "use strict";

    var socket = io();

    var config = {
        elements: {
            enterNickname: document.getElementById('enterNickname'),
            dashboard: document.getElementById('dashboard'),
            inputWordWrapper: document.getElementById('inputWordWrapper'),
            userForm:  document.getElementById('userForm'),
            username: document.getElementById('username'),
            userList: document.getElementById('currentUsers'),
            onlineUsers: document.getElementById('onlineUsers'),
            playGame: document.getElementById('playButton'),
            numberCount: document.getElementById('numberCount'),
            wordForm: document.getElementById('wordForm'),
            inputWord: document.getElementById('inputWord')
        }
    };

    var app = {
        init: function() {
            users.enterNickname();
            data.dataInput();
        }
    };

    var users = {
        nickName: [],
        enterNickname: function() {
            config.elements.userForm.addEventListener("submit", function(e){
                e.preventDefault();
                users.nickName = [];
                socket.emit('new user', config.elements.username.value);
                users.nickName.push(config.elements.username.value);
                config.elements.enterNickname.classList.add("hide");
                users.nickNames();
                game.playGame();
            });
        },
        nickNames: function() {
            config.elements.dashboard.classList.remove("hide");
            socket.on('nicknames', function(data) {
                var html = '';
                var usersArr = [];
                var amountList = document.createElement('ul');
                var i;
                for(i = 0; i < data.length; i++) {
                    html += '<li class="list-group-item">'+data[i]+'</li>';
                    usersArr.push(data[i].length);
                    var amount = usersArr.length;
                    amountList.append(amount);
                    config.elements.onlineUsers.innerHTML = 'Online users: ' + amount;
                }
                config.elements.userList.innerHTML = html;
            });
        }
    };

    var data = {
        dataInput: function() {
            config.elements.wordForm.addEventListener("submit", function(e){
                e.preventDefault();
                var chosenWord = [];
                chosenWord.push(config.elements.inputWord.value);
                socket.emit('choose word', chosenWord);
                data.dataReceiver();
            });
        },
        dataReceiver: function() {
            socket.on('new tweet', function(data) {
                console.log(data);
                var tweetList = document.getElementById('tweets');
                var listItem = document.createElement('li');
                tweetList.appendChild(listItem).innerHTML=(data.text);
                game.tweetCounter(data.text);
            });
        }
    };

    var game = {
        playGame: function() {
            config.elements.playGame.addEventListener("click", function(e){
                config.elements.dashboard.classList.add('hide');
                config.elements.inputWordWrapper.classList.remove('hide');
            });
        },
        tweetNumber: [],
        tweetCounter: function(tweets) {
            game.tweetNumber.push(tweets);
            console.log(game.tweetNumber.length);
            config.elements.numberCount.innerText=game.tweetNumber.length;
        }
    };

    app.init();
})();
