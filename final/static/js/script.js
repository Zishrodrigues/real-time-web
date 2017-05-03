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
            guessedWord: document.getElementById('guessedWord'),
            goal: document.getElementById('goal'),
            gameResults: document.getElementById('gameResults'),
            resetGame: document.getElementById('reset'),
            offlineButton: document.getElementById('offlineButton')
        }
    };

    var app = {
        init: function() {
            app.checkConnection();
            users.checkNickname();
            game.resultsPopup();
            data.dataInput();
            data.error();
            console.log(config.highScore);
            console.log(config.nickName);
        },
        checkConnection: function() {
            config.elements.offlineButton.addEventListener("click", function(e){
                location.reload();
            });
            setInterval(function(){
                if (navigator.onLine) {
                  console.log('online');
                } else {
                  console.log('offline');
                  document.getElementById('offline').classList.remove('hide');
                }
            }, 2000);
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
                game.chosenWord(chosenWord);
                data.dataReceiver();
                game.timeCounter();
            });
        },
        dataReceiver: function(chosenWord) {
            socket.on('new tweet', function(data) {
                var tweetList = document.getElementById('tweets');
                var listItem = document.createElement('li');
                tweetList.appendChild(listItem).innerHTML=(data.text);
                game.tweetCounter(data.text);
            });
        },
        error: function(error) {
            socket.on('stream error', function(error) {
                console.log(error);
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
        chosenWord: function(chosenWord) {
            config.elements.guessedWord.innerHTML = chosenWord;
        },
        setNumber: function() {
            var randomNumber = Math.floor((Math.random() * 500) + 10);
            config.elements.randomNumber.innerHTML = randomNumber;
            config.elements.goal.innerHTML = randomNumber;
            game.results(randomNumber);
        },
        tweetNumber: [],
        tweetCounter: function(tweets) {
            game.tweetNumber.push(tweets);
            config.elements.numberCount.innerText=game.tweetNumber.length;
        },
        timeCounter: function() {
            function getTimeRemaining(endtime) {
              var t = Date.parse(endtime) - Date.parse(new Date());
              var seconds = Math.floor((t / 1000) % 60);
              return {
                'seconds': seconds
              };
            }

            function initializeClock(id, endtime) {
              var clock = document.getElementById(id);
              var secondsSpan = clock.querySelector('.seconds');

              function updateClock() {
                var t = getTimeRemaining(endtime);

                secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

                if (t.total <= 0) {
                  clearInterval(timeinterval);
                }
              }

              updateClock();
              var timeinterval = setInterval(updateClock, 1000);
            }

            var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
            initializeClock('clockdiv', deadline);
        },
        results: function(randomNumber) {
            socket.on('stream stopped', function() {
                var tweetAmount = game.tweetNumber.length;
                var numberDiv = randomNumber/100;
                var result = tweetAmount/numberDiv;
                var score = Math.floor(result);
                if(Math.abs(score - 100) < Math.abs(localStorage.getItem('highscore') - 100)) {
                    localStorage.setItem('highscore', score);
                    console.log('new highscore');
                }
                socket.emit('results popup', score);
                config.elements.countTweets.classList.add('hide');
                config.elements.gameResults.classList.remove('hide');
                document.getElementById('resultsGuess').innerHTML=randomNumber;
                document.getElementById('resultsAmount').innerHTML=tweetAmount;
                document.getElementById('resultsScore').innerHTML=Math.floor(result) + "%";
            });
            game.resetGame();
        },
        resultsPopup: function() {
            socket.on('results popup', function(result) {
                console.log('popup' + result);
            });
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
