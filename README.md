# Real Time Web

Zishan Rodrigues K. Pasha

## Real Time Web: Final (tweet game)

V 1.0.0
[Live link](https://real-time-web-tweetgame-mskpmirabf.now.sh/)

### project
The goal of this project was to seamlessly implement sockets using an external api and node server. Using the Twitter public stream api I created a game that uses live tweets and user input.

![tweetgame screenshot](https://raw.githubusercontent.com/zishrodrigues/real-time-web/master/screen1.jpg)

![tweetgame screenshot](https://raw.githubusercontent.com/zishrodrigues/real-time-web/master/screen1.jpg)

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

### License

MIT | Copyright (c) 2017 Zish Rodrigues (zishrodrigues@gmail.com)

## Week 2: External api (Research for the Tweet game!)

After developing a simple sockets.io based chat-game in which users had to guess the image I set out to get a deeper understanding of using external sources. Using the twitter public streaming Api I now have a continues stream of tweets based on user input, I also count the number of tweets.

Using the knowledge i've gained this week i'm going to build a guessing game using the streaming api.

### Features
* Input a word to search live tweets
* See number of tweets displayed

### Wishlist / to-do
- [x] Use an external api
- [x] Query based on input
- [x] Count tweets
- [x] Stop the stream after a number of seconds
- [ ] Visually show counting of tweets
- [ ] Create a logical flow
- [ ] Add storage for points and highscores
- [ ] Add nick names
- [ ] Add userlist

### Installing locally

Using the following steps you can install and use the app locally.

#### Cloning or downloading the repo

```
$ git clone https://github.com/Zishrodrigues/real-time-web.git
```
#### Installing the required dependencies
Go into the folder week-2 and run the following command:
```
$ npm install
```
Wait for the required npm packages to install and proceed further.

#### Adding an .env file
Add your own .env file in the root folder with the following keys and tokens from your own Twitter account:
```
CONSUMERKEY=YOURCONSUMERKEY
CONSUMERSECRET=YOURCONSUMERSECRET
ACCESSTOKEN=ACCESSTOKEN
ACCESSTOKENSECRET=ACCESSTOKENSECRET
```

#### Starting and running the server
Make sure port 3007 isn't being used by another project. If this is the case run the following command in the root of your project
```
$ npm run start
```
If you get the message ```app listening in port 3007 ``` the server started successfully on localhost:3007.

## Week 1: Sockets.io playground & testing

V 1.0.0

[Live link](https://real-time-web-week-1-qtaejfdarn.now.sh/)

During the first week of Real-Time-Web I focused on getting to know the basics of Sockets.io and understanding it's inner workings.
To accomplish this I created a simple chat app which demonstrated the foundations of using Sockets by creating an open channel between the client and client. I used [the sockets.io chat tutorial](https://socket.io/get-started/chat/) as a guide for my project and in understanding how sockets.io work.

### Features
* Send and receive real-time chat messages
* Use your own nickname

### Wishlist / to-do
- [x] Create active Socket connection
- [x] Add usernames
- [x] Add Default username if none chosen
- [ ] Add list of active users
- [ ] Add unique colors per user
- [ ] Add rooms
- [ ] Add styling

### Installing locally

Using the following steps you can install and use the app locally.

#### Cloning or downloading the repo

```
$ git clone https://github.com/Zishrodrigues/real-time-web.git
```
#### Installing the required dependencies
Go into the folder week-1 and run the following command:
```
$ npm install
```
Wait for the required npm packages to install and proceed further.

#### Starting and running the server
Make sure port 3007 isn't being used by another project. If this is the case run the following command in the root of your project
```
$ npm run start
```
If you get the message ```app listening in port 3007 ``` the server started successfully on localhost:3007.

### Sources
I used [the sockets.io chat tutorial](https://socket.io/get-started/chat/) as a guide for my project and in understanding how sockets.io work.

### License

MIT | Copyright (c) 2017 Zish Rodrigues (zishrodrigues@gmail.com)
