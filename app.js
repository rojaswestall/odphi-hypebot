'use strict';

const director = require('director');
const Server   = require('./lib/server');
const CronJob = require('cron').CronJob;
const Bot  = require('./lib/bot');

// Create a router for GET and POST requests to the app
const router = new director.http.Router({
    '/': {
        post: Server.postResponse,
        get: Server.getResponse
    }
});

// Check if the `--dev` flag was passed
const devMode = process.argv[2] === '--dev';

var am = new CronJob({
  cronTime: "01 40 14 * * *", //AM 8:07:01
  onTick: Bot.sendMessage("It’s time to get Hype Hype Hype Hype Hype Hype Hype Hype!!!!"),
  start: false,
  timeZone: "America/Chicago",
  runOnInit: false
});

var pm = new CronJob({
  cronTime: "45 7 20 * * *", //PM 8:07:01
  onTick: Bot.sendMessage("It’s time to get Hype Hype Hype Hype Hype Hype Hype Hype!!!!2"),
  start: true,
  timeZone: "America/Chicago"
});

console.log('am status', am.running); // job1 status undefined
console.log('pm status', pm.running); // job2 status undefined

// am.start(); // job 1 started




// Start listening
var port = Number(process.env.PORT || 5000);
const server = new Server(router, devMode, port);
server.serve();

console.log('am status', am.running); // job1 status true
console.log('pm status', pm.running);