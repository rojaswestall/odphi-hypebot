'use strict';

// For timed events:
var CronJob = require('cron').CronJob;

require('dotenv').config();

// For setting up and starting the server:
const director = require('director');
const Server = require('./lib/server');

// To send messages
const Bot = require('./lib/bot');

// For Tasks
const TaskManager = require('./lib/hypebotdb');

// For info on cron jobs:
// https://github.com/kelektiv/node-cron

// This cronjob would send the tasks that still need to be accomplished
// Pulls data from hypebotdb
var am = new CronJob({
  cronTime: "01 07 08 * * *", //AM 8:07:01
  onTick: function(){
    console.log("am hit");
    TaskManager.showTasks();
    // sendMessage("Merry Christmas bros!!!! Have fun with your fams : )");
  },
  start: true,
  timeZone: "America/Chicago",
  runOnInit: false
});

// This is for night hype messages at 8:07
var hypemsgs = Array(
  "It’s time to get Hype Hype Hype Hype Hype Hype Hype Hype!!!!",
  "GET HYPE!!!",
  "ONE NINE!"
  );

var pm = new CronJob({
  cronTime: "01 07 20 * * *", //PM 8:07:01
  // cronTime: "01 01 09 * * *",
  onTick: function(){
    console.log("pm hit");
    Bot.sendMessage(hypemsgs[Math.floor(Math.random()*hypemsgs.length)]);
    // sendMessage("Feliz Noche Buena! Remember, always keep the hype : )");
  },
  start: true,
  timeZone: "America/Chicago",
  runOnInit: false
});

// Founder's Day Message
var foundersday = new CronJob({
  cronTime: "00 00 00 25 10 *", //Nov. 25
  onTick: function(){
   console.log("foundersday hit");
   Bot.sendMessage("Happy Founder's Day bros!!!");
  },
  start: true,
  timeZone: "America/Chicago",
  runOnInit: false
});

// New Years Message
var newyears = new CronJob({
  cronTime: "00 00 00 01 00 *", //Jan. 1
  onTick: function(){
   console.log("newyears hit");
   Bot.sendMessage("HAPPY NEW YEAR BROS!!!!");
  },
  start: true,
  timeZone: "America/Chicago",
  runOnInit: false
});




// Create a router for GET and POST requests to the app
const router = new director.http.Router({
    '/': {
        post: Server.postResponse,
        get: Server.getResponse
    }
});

// Check if the `--dev` flag was passed
const devMode = process.argv[2] === '--dev';

// Start listening
var port = Number(process.env.PORT || 5000);
const server = new Server(router, devMode, port);
server.serve();