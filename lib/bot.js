'use strict';

require('dotenv').config();

const https = require('https');

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
        const senderName = message.name;

        // Learn about regular expressions in JavaScript: 
        // https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_Expressions
        const hypeMeRegex = /HYPE ME/;
        const lykaiosRegex = /Lykaios/;
        const canisRegex = /Canis/;
        const guajiroRegex = /Guajiro/;
        const vagabundoRegex = /Vagabundo/;
        const jaimeRegex = /Jaime/;
        const sanoRegex = /Sano/;

        // Use Regex to find fabian in a message
        // const fabesRegex1 = /^fabian/;
        // const fabesRegex2 = /^Fabian/;
        // const fabesRegex3 = /fabian$/;
        // const fabesRegex4 = /Fabian$/;
        const fabianRegex = /fabian/i;

        // Check if the GroupMe message has content and if the regex pattern is true
        
        if (messageText && senderName && sanoRegex.test(senderName) && hypeMeRegex.test(messageText)) {
            var sanoPhrases = Array(
                "KAPPAS KAPPAS TILL WE DIE",
                "111119!!!!!",
                "Too Hype Too Hype!",
                "Where are the Capri-Suns?!",
                "Who’s gonna represent till they die?",
                "Too Kute Too Kute",
                "Sigma what, Sigma who??",
                "Alpha Beta Gamma Delta Epsilon Zeta Eta Theta Iota Kappa Lambda Mu Nu Xi Omicron Pi Rho Sigma Tau Upsilon Phi Chi Psi Omega Delta Phi!!!!",
                "Hype yourself.",
                "HEEEELLL YEA",
                "Sano > Jaime > Lykaios > Canis > Vista > Marchitar > Guajiro > Vagabundo",
                "Through all unwaivering!");
            return sanoPhrases[Math.floor(Math.random()*sanoPhrases.length)];
        }


        if (messageText && senderName && jaimeRegex.test(senderName) && hypeMeRegex.test(messageText)) {
            var jaimePhrases = Array(
                "111119!!!!!",
                "Too Hype Too Hype!",
                "Too Proud Too Proud!",
                "Who you wit!?!",
                "Where are the Capri-Suns?!",
                "Too Kute Too Kute",
                "Hype yourself.",
                "wot in tarnation",
                "https://youtu.be/S15eSFlMXtk", //Upsilon probate
                "Hahah little mac. You have a little mac...",
                "IF you cross....");
            return jaimePhrases[Math.floor(Math.random()*jaimePhrases.length)];
        }
        // You shouldn’t say “when you cross” because that means that you aren’t motivated since you already know you’re going to get in. Instead,  “if you cross” motivates you because you don’t know if you’ll get in or not.

        if (messageText && senderName && lykaiosRegex.test(senderName) && hypeMeRegex.test(messageText)) {
            var lykaiosPhrases = Array(
                "111119!!!!!",
                "Too Hype Too Hype!",
                "Too Proud Too Proud!",
                "Where are the Capri-Suns?!",
                "Who’s gonna represent till they die?",
                "Hype yourself.",
                "You love your ne-hoes : ) ... and they love you",
                "Bish, what?",
                "You are greatness.",
                "Be strong enough to stand alone, be yourself enough to stand apart, but be wise enough to stand together when the time comes. Be Lykaios.");
            return lykaiosPhrases[Math.floor(Math.random()*lykaiosPhrases.length)];
        }

        if (messageText && senderName && canisRegex.test(senderName) && hypeMeRegex.test(messageText)) {
            // return "lol fabian fuck u";
            var canisPhrases = Array(
                "Too Hype Too Hype!",
                "Too Proud Too Proud!",
                "Where are the Capri-Suns?!",
                "Who’s gonna represent till they die?",
                "Hype yourself.",
                "Weeoooooooow",
                "No, you fuck. You're the reason Michael doesn't have a little",
                "lol fabian fuck u",
                "hahahahah angel beat you in smash",
                "津波",
                ".01",
                "Lol ... \"I know how to make hypejuice\"",
                "Kay-so");
            return canisPhrases[Math.floor(Math.random()*canisPhrases.length)];
        }

        if (messageText && senderName && hypeMeRegex.test(messageText) && (guajiroRegex.test(senderName) || vagabundoRegex.test(senderName))) {
            var neoPhrases = Array(
                "Fuckin neo",
                "lol get back on line",
                "https://youtu.be/3NXBgSCSrIk", //laffy taffy
                "111119!!!!!",
                "Too Hype Too Hype!",
                "Too Proud Too Proud!",
                "Where are the Capri-Suns?!",
                "Who’s gonna represent till they die?",
                "Sigma what, Sigma who??",
                "Alpha Beta Gamma Delta Epsilon Zeta Eta Theta Iota Kappa Lambda Mu Nu Xi Omicron Pi Rho Sigma Tau Upsilon Phi Chi Psi Omega Delta Phi!!!!",
                "Hype yourself.",
                "ΦΔΩ");
            return neoPhrases[Math.floor(Math.random()*neoPhrases.length)];
        }

        // Just for the general member
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
            // var phrases = Array(
            //     "Hope you haven’t been naughty this year : )",
            //     "Twas the night before Christmas when all through the house, The A/C was running cause Fabes lives in the south",
            //     "The tree better not be the only thing getting lit this year",
            //     "Merry Christmas to Lykaios and his Ne - ho ho hoes!",
            //     "Merry Kissmyass");
            return phrases[Math.floor(Math.random()*phrases.length)];
        }
        
        if (messageText && (fabianRegex.test(messageText) {
            return "fuck fabian";
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
};

module.exports = Bot;
