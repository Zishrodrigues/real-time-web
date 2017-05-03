# Tweet game

Zishan Rodrigues K. Pasha | V 1.0.0
[Live link](https://real-time-web-tweetgame-mskpmirabf.now.sh/)

## Real Time Web: Final (tweet game)

### project
The goal of this project was to seamlessly implement sockets using an external api and node server. Using the Twitter public stream api I created a game that uses live tweets and user input.

![tweetgame screenshot](https://raw.githubusercontent.com/zishrodrigues/real-time-web/master/screenshots/screen1.jpg)

![tweetgame screenshot](https://raw.githubusercontent.com/zishrodrigues/real-time-web/master/screenshots/screen1.jpg)

### Process
Creating this application required extensive research into the use of sockets.io and the Twitter api. Part of my research of creating a mini game with a chat where users could guess an image by seeing part of it. After getting a knack for the usage of sockets I started a new and added the twitter api. During development I had multiple testing sessions with users to get live feedback about the UX and general experience.

### Results
After extensive development and testing the app now runs smoothly across most modern browsers, it is also responsive. When a internet connection ceases to exist the users gets feedback and the opportunity to restart the app.

### Feature list
* Choose a nickname and store it in Localstorage (or create a new one)
* Get a random number and choose a word that you think wil be tweeted that many times
* See a live counting of tweets as well as the tweets
* See remaining time, chosen word and goal number during counting
* Get a highscore and store it, update the stored highscore if needed
* Emit your latest score to all active players
* Option to reset nickname/score
* Get feedback if your internet connection fails

### Wishlist / to-do
- [ ] Spectator mode
- [ ] External database for permanent highscores
- [ ] Mobile version optimized css

### Game data
A players nickname and highscore are stored in their browser localstorage. Whenever they're online they don't have to pick a nickname and they emit their highscore to all other active players.

The tweets that come in and numbers are stored in temporary variables. These are updated whenever a user plays a new game.

### Installing locally

Using the following steps you can install and use the app locally.

#### Cloning or downloading the repo

```
$ git clone https://github.com/Zishrodrigues/real-time-web.git
```
#### Installing the required dependencies
Go into the folder final and run the following command:
```
$ npm install
```
Wait for the required npm packages to install and proceed further.

#### Starting and running the server
Make sure port 3007 isn't being used by another project. If this is the case run the following command in the root of the 'final' folder.
```
$ npm run start
```
If you get the message ```app listening in port 3007 ``` the server started successfully on localhost:3007.

### Tools & packages

* Atom code editor
* dotenv (for .env filed which contain hidden keys)
* ejs (for templating)
* express (for the server)
* socket.io (for socket handeling)
* twitter (for setting up the twitter stream)
* Now (for deployent)

### Sources
* confetti animation by Hemn Chawroka

### License

MIT | Copyright (c) 2017 Zish Rodrigues (zishrodrigues@gmail.com)
