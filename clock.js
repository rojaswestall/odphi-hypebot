require('dotenv').config();
var CronJob = require('cron').CronJob;
const https = require('https');

console.log('RUNNING! clock')
// Same as BOT sendMessage
sendMessage = function(messageText) {
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
  cronTime: "00 33 13 * * *", //AM 8:07:01
  onTick: function(){
  	console.log("am hit");
  	sendMessage("It’s time to get Hype Hype Hype Hype Hype Hype Hype Hype!!!!");
  },
  start: true,
  timeZone: "America/Chicago",
  runOnInit: false
});

var pm = new CronJob({
  cronTime: "30 33 13 * * *", //PM 8:07:01
  onTick: function(){
  	console.log("pm hit");
  	sendMessage("It’s time to get Hype Hype Hype Hype Hype Hype Hype Hype!!!!2");
  },
  start: true,
  timeZone: "America/Chicago",
  runOnInit: false
});







