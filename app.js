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


var am = new CronJob({
  cronTime: "01 07 08 * * *", //AM 8:07:01
  // cronTime: "01 12 08 * * *", // Used for testing
  onTick: function(){
  	console.log("am hit");
  	// sendMessage("It’s time to get Hype Hype Hype Hype Hype Hype Hype Hype!!!!");
    sendMessage("Merry Christmas bros!!!! Have fun with your fams : )");
  },
  start: true,
  timeZone: "America/Chicago",
  runOnInit: false
});

var pm = new CronJob({
  cronTime: "01 07 20 * * *", //PM 8:07:01
  onTick: function(){
  	console.log("pm hit");
  	// sendMessage("It’s time to get Hype Hype Hype Hype Hype Hype Hype Hype!!!!");
    sendMessage("Feliz Noche Buena! Remember, always keep the hype : )");
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