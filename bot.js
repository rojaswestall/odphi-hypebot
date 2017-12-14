var HTTPS = require('https');
//var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^HYPE ME$/;

  console.log(request)

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}



var phrases = Array(
  "KAPPAS KAPPAS TILL WE DIE",
  "111119!!!!!",
  "Too Hype Too Hype!",
  "Too Proud Too Proud!",
  "Who you wit!?!",
  "Where are the Capri-Suns?!")

// When it hits 8:07 “It’s time to get Hype Hype Hype Hype Hype Hype Hype Hype!!!!”

function postMessageFabian() {

}

function postMessageNeos() {
  
}

function postMessage() {
  var botResponse, options, body, botReq;

  //botResponse = cool();

  botResponse = phrases[Math.floor(Math.random()*phrases.length)]

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
















