'use strict';

require('dotenv').config();

const https = require('https');

const TaskManager = require('./hypebotdb');

class Bot {
    

    /*
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

        // ^ - nothing before it
        // $ - nothing after it
        // i - Case insensitive

        // Instructions for HypeBot
        const instructionsRegex = /^Hype Instructions$/i;
        if (messageText && instructionsRegex.test(messageText)) {
            return "To get hyped: \"HYPE ME\"\nTo add new Knight to TaskBook: \"New Knight - KNIGHT_NAME\"\nTo remove a Knight from TaskBook: \"Remove Knight - KNIGHT_NAME\"\nTo add a task for a Knight: \"Add Task - KNIGHT_NAME: TASK\"\nTo see all tasks: \"Show Tasks\"\nTo see instructions: \"Hype Instructions\"";
        }

        // Add new knight to the TaskBook
        const newKnightRegex = /^New Knight - .*$/i;
        if (messageText && newKnightRegex.test(messageText)) {
            var newknight = messageText.substring(13);
            TaskManager.newUser(newknight);
            return null;
        }

        // Remove knight from the TaskBook
        const removeKnightRegex = /^Remove Knight - .*$/i;
        if (messageText && removeKnightRegex.test(messageText)) {
            var knightToRemove = messageText.substring(16);
            TaskManager.deleteUser(knightToRemove);
            return null;
        }

        // Add a task for a knight
        const addTaskRegex = /^Add Task - .*: .*/i;
        const knightTaskRegex = /- .*:/i;
        const taskRegex = /: .*/i;
        if (messageText && addTaskRegex.test(messageText)) {
            var knightString = knightTaskRegex.exec(messageText)[0];
            var knight = knightString.substring(2, knightString.length - 1);
            var task = taskRegex.exec(messageText)[0].substring(2);
            TaskManager.newTask(knight, task);
            return null;
        }

        // Show tasks for all the bros
        const showTasksRegex = /^Show Tasks/i;
        if (messageText && showTasksRegex.test(messageText)) {
            TaskManager.showTasks();
            return null;
        }

        // Remove a task for a knight
        const removeTaskRegex = /^Remove Task - .*: .*/i;
        if (messageText && removeTaskRegex.test(messageText)) {
            var knightString = knightTaskRegex.exec(messageText)[0];
            var knight = knightString.substring(2, knightString.length - 1);
            var taskNumber = taskRegex.exec(messageText)[0].substring(2);

            TaskManager.removeTask(knight, taskNumber);
            return null;
        }

        // Show stats for all bros
        const showStatsRegex = /^Show Stats/i;
        if (messageText && showStatsRegex.test(messageText)) {
            TaskManager.showStats();
            return null;
        }


        const hypeMeRegex = /HYPE ME/;
        const lykaiosRegex = /Lykaios/;
        const canisRegex = /Canis/;
        const guajiroRegex = /Guajiro/;
        const vagabundoRegex = /Vagabundo/;
        const jaimeRegex = /Jaime/;
        const sanoRegex = /Sano/;
        const fabianRegex = /fabian/i;
        const testbotRegex = /testbot!/;
        const botRegex = /Hypebot2\.0/;

        // Check if the GroupMe message has content and if the regex pattern is true

        // lol the fuck fabian message
        // Have to make sure the bot's name is either Hypebot2.0 or testbot! otherwise it will keep sending messages over and over
        if (messageText && fabianRegex.test(messageText) && !(botRegex.test(senderName) || testbotRegex.test(senderName))) {
            return "fuck fabian";
        }
        
        // SANO -- BRANDON
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
                "Sano > Jaime > Lykaios > Canis > Marchitar > Guajiro > Vagabundo",
                "Through all unwaivering!");
            return sanoPhrases[Math.floor(Math.random()*sanoPhrases.length)];
        }

        // JAIME -- ANGEL
        if (messageText && senderName && jaimeRegex.test(senderName) && hypeMeRegex.test(messageText)) {
            var jaimePhrases = Array(
                "111119!!!!!",
                "Too Hype Too Hype!",
                "Too Proud Too Proud!",
                "Who you wit!?!",
                "Hype yourself.",
                "wot in tarnation",
                "https://youtu.be/S15eSFlMXtk", //Upsilon probate
                "Hahah little mac. You have a little mac...",
                "IF you cross....");
            return jaimePhrases[Math.floor(Math.random()*jaimePhrases.length)];
        }
        // You shouldn’t say “when you cross” because that means that you aren’t motivated since you already know you’re going to get in. Instead,  “if you cross” motivates you because you don’t know if you’ll get in or not.

        // LYKAIOS -- JOHNNY
        if (messageText && senderName && lykaiosRegex.test(senderName) && hypeMeRegex.test(messageText)) {
            var lykaiosPhrases = Array(
                "You down to smoke???",
                "Hype yourself.",
                "You love your ne-hoes : ) ... and they love you",
                "Bish, what?",
                "You are greatness.",
                "Be strong enough to stand alone, be yourself enough to stand apart, but be wise enough to stand together when the time comes. Be Lykaios."
                );
            return lykaiosPhrases[Math.floor(Math.random()*lykaiosPhrases.length)];
        }

        // CANIS -- FABIAN
        if (messageText && senderName && canisRegex.test(senderName) && hypeMeRegex.test(messageText)) {
            // return "lol fabian fuck u";
            var canisPhrases = Array(
                "Hype yourself.",
                "Weeoooooooow",
                "No, you fuck. You're the reason Michael doesn't have a little",
                "lol fabes fuck u",
                "hahahahah angel beat you in smash",
                "津波",
                ".01",
                "Lol ... \"I know how to make hypejuice\"",
                "Kay-so");
            return canisPhrases[Math.floor(Math.random()*canisPhrases.length)];
        }

        // GUAJIRO -- JAVIER
        if (messageText && senderName && guajiroRegex.test(senderName) && hypeMeRegex.test(messageText)) {
            var guajiroPhrases = Array(
                "Hype yourself.",
                "ΦΔΩ. Need I say more?",
                "Fuckin neo",
                "lol get back on line",
                "https://youtu.be/3NXBgSCSrIk",
                "that's racist",
                "that's at least slightly racist",
                "Your word is your bond. And your bond is shit."
                );
            return guarijoPhrases[Math.floor(Math.random()*guajiroPhrases.length)];
        }

        // VAGABUNDO -- ALEX
        if (messageText && senderName && vagabundoRegex.test(senderName) && hypeMeRegex.test(messageText)) {
            var vagabundoPhrases = Array(
                "Hype yourself.",
                "ΦΔΩ. Need I say more?",
                "Fuckin neo",
                "lol get back on line",
                "https://youtu.be/3NXBgSCSrIk",
                "That's my fraaaand",
                "I'll swipe you in!",
                ""
                );
            return vagabundoPhrases[Math.floor(Math.random()*vagabundoPhrases.length)];
        }

        // Just for the general member
        if (messageText && hypeMeRegex.test(messageText) && !(botRegex.test(senderName) || testbotRegex.test(senderName))) {
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
            //     "Hope you haven’t been naughty this year ; )",
            //     "Twas the night before Christmas when all through the house, The A/C was running cause Fabes lives in the south",
            //     "The tree better not be the only thing getting lit this year",
            //     "Merry Christmas to Lykaios and his Ne - ho ho hoes!",
            //     "Merry Kissmyass");
            return phrases[Math.floor(Math.random()*phrases.length)];
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
        console.log('Sending ' + JSON.stringify(body.text));
    };
};

module.exports = Bot;
