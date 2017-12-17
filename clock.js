const Worker  = require('./worker');
var CronJob = require('cron').CronJob;

var am = new CronJob({
  cronTime: "10 20 15 * * *", //AM 8:07:01
  onTick: Bot.sendMessage("It’s time to get Hype Hype Hype Hype Hype Hype Hype Hype!!!!"),
  start: true,
  timeZone: "America/Chicago",
  runOnInit: true
});

var pm = new CronJob({
  cronTime: "1 7 20 * * *", //PM 8:07:01
  onTick: Bot.sendMessage("It’s time to get Hype Hype Hype Hype Hype Hype Hype Hype!!!!"),
  start: true,
  timeZone: "America/Chicago"
});

// am.start();
// pm.start();