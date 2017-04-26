(function() {
    "use strict";

    var socket = io();

    var config = {
        elements: {
            enterNickname: document.getElementById('enterNickname'),
            dashboard: document.getElementById('dashboard'),
            gameWrapper: document.getElementById('gameWrapper'),
            randomNumber: document.getElementById('randomNumber'),
            inputWordWrapper: document.getElementById('inputWordWrapper'),
            countTweets: document.getElementById('countTweets'),
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
                config.elements.inputWordWrapper.classList.add('hide');
                config.elements.countTweets.classList.remove('hide');
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
        playGame: function() {
            config.elements.playGame.addEventListener("click", function(e){
                config.elements.dashboard.classList.add('hide');
                config.elements.gameWrapper.classList.remove('hide');
                game.setNumber();
            });
        },
        setNumber: function() {
            var randomNumber = Math.floor((Math.random() * 500) + 10);
            config.elements.randomNumber.innerHTML = randomNumber;
        },
        tweetNumber: [],
        tweetCounter: function(tweets) {
            game.tweetNumber.push(tweets);
            config.elements.numberCount.innerText=game.tweetNumber.length;
            game.results();
        },
        results: function() {
            socket.on('stream stopped', function() {
                var tweetAmount = game.tweetNumber.length;
                console.log(tweetAmount);
            });
        }
    };

    app.init();
})();
