var HTTPS = require('https');

var botID = process.env.BOT_ID;


function findWord(message, word) {
  var re = new RegExp(word, "i"),
      wrdlen = word.length,
      result = false,
      lowerMessage = message.toLowerCase(),
      partial;

  for(i = 0; i < message.length; i++) {
    if(i+wrdlen <= message.length) {
      partial = lowerMessage.substr(i,i+wrdlen);
      console.log(partial);
      if (re.test(partial)) {
        result = true;
        break;
      }
    } else {
      break;
    }
  }
  return result;
}

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      hypeMeRegex = /^HYPE ME$/;

  console.log(request.text);
//   worker: node worker.js
// clock:  node clock.js

  if(request.text && hypeMeRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else if(request.text && findWord(request.text, "fabian")) {
    this.res.writeHead(200);
    postMessageFabian();
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
  "Where are the Capri-Suns?!",
  "Who’s gonna represent till they die?",
  "Too Kute Too Kute",
  "Sigma what, Sigma who??",
  "Alpha Beta Gamma Delta Epsilon Zeta Eta Theta Iota Kappa Lambda Mu Nu Xi Omicron Pi Rho Sigma Tau Upsilon Phi Chi Psi Omega Delta Phi!!!!",
  "Hype yourself.");

// userIDs
// When it hits 8:07 “It’s time to get Hype Hype Hype Hype Hype Hype Hype Hype!!!!”

var postOptions = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

function postMessageFabianHype() {
}

function postMessageNeos() {
}





// To say fuck fabian whenever it sees Fabian in a sentence
function postMessageFabian() {
  var botResponse, body, ffabesReq;

  botResponse = "fuck fabian : )";

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  ffabesReq = HTTPS.request(postOptions, function(res) {
      if(res.statusCode == 202) {
        console.log("hit the fuck fabian function")
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  ffabesReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  ffabesReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  ffabesReq.end(JSON.stringify(body));
}



// FOR REGULAR HYPE ME
function postMessage() {
  var botResponse, body, hypeReq;

  botResponse = phrases[Math.floor(Math.random()*phrases.length)];

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  hypeReq = HTTPS.request(postOptions, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  hypeReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  hypeReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  hypeReq.end(JSON.stringify(body));
}


exports.respond = respond;
















