# Real Time Web

Zishan Rodrigues K. Pasha | V 0.1

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
- [ ] Add local storage for points
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

#### Starting and running the server
Make sure port 3007 isn't being used by another project. If this is the case run the following command in the root of your project
```
$ npm run start
```
If you get the message ```app listening in port 3007 ``` the server started successfully on localhost:3007.

### License

MIT | Copyright (c) 2017 Zish Rodrigues (zishrodrigues@gmail.com)
