const Bot  = require('./bot');
var CronJob = require('cron').CronJob;

new CronJob({
  cronTime: "1 00 13 * * *", //AM 8:07:01
  onTick: Bot.sendMessage("It’s time to get Hype Hype Hype Hype Hype Hype Hype Hype!!!!"),
  start: true,
  timeZone: "America/Chicago"
});

new CronJob({
  cronTime: "1 7 20 * * *", //PM 8:07:01
  onTick: Bot.sendMessage("It’s time to get Hype Hype Hype Hype Hype Hype Hype Hype!!!!"),
  start: true,
  timeZone: "America/Chicago"
});