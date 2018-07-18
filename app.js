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
const TaskManager = require('./lib/hypebotdb/taskbook');

// For info on cron jobs:
// https://github.com/kelektiv/node-cron

// SHOW TASKS EVERY MORNING
// Pulls data from hypebotdb
// var am = new CronJob({
//   cronTime: "00 07 08 * * *", //AM 8:07:00
//   onTick: function(){
//     console.log("am hit");
//     TaskManager.showTasks();
//   },
//   start: true,
//   timeZone: "America/Chicago",
//   runOnInit: false
// });

// SHOW TASKS EVERY WEDNESDAY MORNING
var am = new CronJob({
  cronTime: "00 07 08 * * 3", //AM 8:07:00
  onTick: function(){
    console.log("am hit");
    TaskManager.showTasks();
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

// RANDOM HYPE MESSAGES
// var pm = new CronJob({
//   cronTime: "00 07 20 * * 1-6", //PM 8:07:00 mon-sat
//   // cronTime: "01 01 09 * * *",
//   onTick: function(){
//     Bot.sendMessage(hypemsgs[Math.floor(Math.random()*hypemsgs.length)]);
//     // sendMessage("Feliz Noche Buena! Remember, always keep the hype : )");
//   },
//   start: true,
//   timeZone: "America/Chicago",
//   runOnInit: false
// });

// SERVICE AND STUDY HOURS
// var serviceAndStudyHoursReminder = new CronJob({
//   cronTime: "00 07 20 * * 0", //PM 8:07:00 only on sundays
//   onTick: function(){
//    Bot.sendMessage("Reminder to report your service and study hours for this week 🙂: \n \n Study Hours: https://docs.google.com/spreadsheets/d/17qQswsqfvqrlOHVPbrn7mViX7omIanLJy146DcyQ2dk/edit#gid=0 \n Service: https://docs.google.com/spreadsheets/d/1GT5YeNzqa1laj0uPWFc-Iez3r-xK2AacKH8NxZbZY60/edit#gid=0");
//   },
//   start: true,
//   timeZone: "America/Chicago",
//   runOnInit: false
// });

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