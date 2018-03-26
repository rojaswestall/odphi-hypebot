'use strict';

// For timed events:
require('dotenv').config();
var CronJob = require('cron').CronJob;
const https = require('https');

// console.log('RUNNING! clock');
// Same as BOT sendMessage
var sendMessage = function(messageText) {
    // Get the GroupMe bot id saved in `.env`
    const botId = process.env.BOT_ID;

    const options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };

    const body = {
        bot_id: botId,
        text: messageText
    };

    // Make the POST request to GroupMe with the http module
    const botRequest = https.request(options, function(response) {
        if (response.statusCode !== 202) {
            console.log('Rejecting bad status code ' + response.statusCode);
            //console.log(response);
        } else {
            //console.log(response);
        }
    });

    // On error
    botRequest.on('error', function(error) {
        console.log('Error posting message ' + JSON.stringify(error));
    });

    // On timeout
    botRequest.on('timeout', function(error) {
        console.log('Timeout posting message ' + JSON.stringify(error));
    });

    // Finally, send the body to GroupMe as a string
    botRequest.end(JSON.stringify(body));
};


// For info on cron jobs:
// https://github.com/kelektiv/node-cron

// This cronjob would send the tasks that still need to be accomplished
// Pulls data from hypebotdb
var am = new CronJob({
  cronTime: "01 07 08 * * *", //AM 8:07:01
  onTick: function(){
    console.log("am hit");
    sendMessage("It’s time to get Hype Hype Hype Hype Hype Hype Hype Hype!!!!");
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
  //cronTime: "01 07 20 * * *", //PM 8:07:01
  cronTime: "01 02 17 * * *",
  onTick: function(){
    console.log("pm hit");
    sendMessage(hypemsgs[Math.floor(Math.random()*hypemsgs.length)]);
    // sendMessage("Feliz Noche Buena! Remember, always keep the hype : )");
  },
  start: true,
  timeZone: "America/Chicago",
  runOnInit: false
});

var pm2 = new CronJob({
  //cronTime: "01 07 20 * * *", //PM 8:07:01
  cronTime: "02 02 17 * * *",
  onTick: function(){
    console.log("pm hit");
    sendMessage(hypemsgs[Math.floor(Math.random()*hypemsgs.length)]);
    // sendMessage("Feliz Noche Buena! Remember, always keep the hype : )");
  },
  start: true,
  timeZone: "America/Chicago",
  runOnInit: false
});

var pm3 = new CronJob({
  //cronTime: "01 07 20 * * *", //PM 8:07:01
  cronTime: "03 02 17 * * *",
  onTick: function(){
    console.log("pm hit");
    sendMessage(hypemsgs[Math.floor(Math.random()*hypemsgs.length)]);
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
   sendMessage("Happy Founder's Day bros!!!");
  },
  start: true,
  timeZone: "America/Chicago",
  runOnInit: false
});

// New Years Message
var newyears = new CronJob({
  cronTime: "00 00 00 01 00 *",
  onTick: function(){
   console.log("newyears hit");
   sendMessage("HAPPY NEW YEAR BROS!!!!");
  },
  start: true,
  timeZone: "America/Chicago",
  runOnInit: false
});



// For setting up and starting the server:
const director = require('director');
const Server   = require('./lib/server');

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

// console.log('am status', am.running); 
// console.log('pm status', pm.running);