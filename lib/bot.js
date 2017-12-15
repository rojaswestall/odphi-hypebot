'use strict';

require('dotenv').config();

const https = require('https');

function findWord(message, word) {
    var re = new RegExp(word, "i"),
        wrdlen = word.length,
        result = false,
        lowerMessage = message.toLowerCase(),
        partial;

    for(var i = 0; i < message.length; i++) {
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
};

class Bot {
    /**
     * Called when the bot receives a message.
     *
     * @static
     * @param {Object} message The message data incoming from GroupMe
     * @return {string}
     */

    
    static checkMessage(message) {
        const messageText = message.text;

        // Learn about regular expressions in JavaScript: https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_Expressions
        const hypeMeRegex = /^HYPE ME$/;
        const fabesRegex = /^fabian/i;

        // Check if the GroupMe message has content and if the regex pattern is true
        if (messageText && hypeMeRegex.test(messageText)) {
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
            return phrases[Math.floor(Math.random()*phrases.length)];
        }
        else if(messageText && messageText.match(fabesRegex)) {
            return "Fuck fabian";
        }

        return null;
    };

    /**
     * Sends a message to GroupMe with a POST request.
     *
     * @static
     * @param {string} messageText A message to send to chat
     * @return {undefined}
     */
    static sendMessage(messageText) {
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
};

module.exports = Bot;
