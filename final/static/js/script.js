(function() {
    "use strict";

    var socket = io();

    var config = {
        nickName: localStorage.getItem('nickname'),
        highScore: localStorage.getItem('highscore'),
        elements: {
            enterNickname: document.getElementById('enterNickname'),
            resetName: document.getElementById('resetNickname'),
            dashboard: document.getElementById('dashboard'),
            gameWrapper: document.getElementById('gameWrapper'),
            randomNumber: document.getElementById('randomNumber'),
            inputWordWrapper: document.getElementById('inputWordWrapper'),
            countTweets: document.getElementById('countTweets'),
            userForm: document.getElementById('userForm'),
            username: document.getElementById('username'),
            userList: document.getElementById('currentUsers'),
            onlineUsers: document.getElementById('onlineUsers'),
            playGame: document.getElementById('playButton'),
            numberCount: document.getElementById('numberCount'),
            wordForm: document.getElementById('wordForm'),
            inputWord: document.getElementById('inputWord'),
            gameResults: document.getElementById('gameResults'),
            resetGame: document.getElementById('reset')
        }
    };

    var app = {
        init: function() {
            users.checkNickname();
            data.dataInput();
            console.log(config.highScore);
            console.log(config.nickName);
        }
    };

    var users = {
        checkNickname: function() {
            if(localStorage.getItem('nickname')) {
                users.nickNames();
                if(localStorage.getItem('highscore')) {
                    socket.emit('new user', config.nickName + '(' + config.highScore + ')' + '%');
                } else {
                    socket.emit('new user', config.nickName);
                }
                config.elements.enterNickname.classList.add("hide");
                game.playGame();
            } else {
                users.enterNickname();
            }
        },
        resetNickname: function() {
            config.elements.resetName.addEventListener("click", function(e){
                localStorage.removeItem("nickname");
                localStorage.removeItem("highscore");
                location.reload();
            });
        },
        nickName: [],
        enterNickname: function() {
            config.elements.userForm.addEventListener("submit", function(e){
                e.preventDefault();
                users.nickName = [];
                socket.emit('new user', config.elements.username.value);
                users.nickName.push(config.elements.username.value);
                localStorage.setItem('nickname', config.elements.username.value);
                config.elements.enterNickname.classList.add("hide");
                users.nickNames();
                game.playGame();
            });
        },
        nickNames: function() {
            users.resetNickname();
            config.elements.dashboard.classList.remove("hide");
            socket.on('nicknames', function(data) {
                var html = '';
                var usersArr = [];
                var amountList = document.createElement('ul');
                var i;
                for(i = 0; i < data.length; i++) {
                    html += '<li class="userListItem">'+data[i]+'</li>';
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
            game.results(randomNumber);
        },
        tweetNumber: [],
        tweetCounter: function(tweets) {
            game.tweetNumber.push(tweets);
            config.elements.numberCount.innerText=game.tweetNumber.length;
        },
        results: function(randomNumber) {
            socket.on('stream stopped', function() {
                var tweetAmount = game.tweetNumber.length;
                var numberDiv = randomNumber/100;
                var result = tweetAmount/numberDiv;
                console.log(Math.floor(result) + "%");
                localStorage.setItem('highscore', Math.floor(result));
                config.elements.countTweets.classList.add('hide');
                config.elements.gameResults.classList.remove('hide');
                document.getElementById('resultsGuess').innerHTML=randomNumber;
                document.getElementById('resultsAmount').innerHTML=tweetAmount;
                document.getElementById('resultsScore').innerHTML=Math.floor(result) + "%";
            });
            console.log(localStorage.getItem('nickname'));
            game.resetGame();
        },
        resetGame: function() {
            config.elements.resetGame.addEventListener("click", function(e){
                // localStorage.setItem('nickname', localStorage.getItem('nickname')+'(' + localStorage.getItem('highscore') + '%)');
                location.reload();
            });
        }
    };

    app.init();
})();
