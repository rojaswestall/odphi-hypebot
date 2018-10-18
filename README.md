# odphi-hypebot

See the new hypebot which is currently in development [here](https://github.com/rojaswestall/hypebot)

**ODPhi Alpha Alpha GroupMe HypeBot2.0:**

- Responds to messages based on key words and the user who sends the message
- Sends messages at 8:07 and on special occassions
- Has a built in task manager that keeps track of tasks for each user
- Allows group to save content as pins and then view pins at anytime

**Instructions on how to use the bot from the group message:**

- Add new Knight to TaskBook: `New Knight - knightname`
- Remove a Knight from TaskBook: `Remove Knight - knightname`
- Add a task for a Knight: `Add Task - knightname: TASK`
- Remove a task for a Knight: `Remove Task - knightname: TASK#`
- See all tasks: `Show Tasks`
- See tasks for a bro: `Show Tasks - knightname`
- See stats: `Show Stats`
- See stats for a bro: `Show Stats - knightname`
- Save a pin: `Add Pin - pincontent`
- Remove a pin: `Remove Pin - pin#`
- Show all pins: `Show Pins`
- Clear all pins: `Clear Pins`
- Instructions: `Instructions`

**On the tech side:**

- A groupme bot that uses node.js to interact with a groupme group message
- Deployed with Heroku, running on one web dyno
- Connects to a mongo database to hold tasks and pins
- Identifies key words using regular expressions

Questions? Email me at <rojaswestall@gmail.com>



## For set up and dev set up
*Yarn must be installed:*

[Install Yarn Here](https://yarnpkg.com/en/docs/install#mac-stable)

or if you have homebrew installed on mac:

```
brew install yarn
```

*The Heroku CLI must be installed:*

[Install the Heroku CLI Here](https://devcenter.heroku.com/articles/heroku-cli)

or if you have homebrew installed on mac:

```
brew install heroku/brew/heroku
```

* You should also be able to use hypebot with npm instead of yarn. Just delete the yarn.lock file and then use npm instead of yarn below

### GitHub:
1. Fork this repository into your github account
2. Copy the url to your clipboard
3. Navigate to the directory that you want to keep this repository
4. Clone the repo
5. Install dependencies with yarn:

```
git clone the-copied-url
cd odphi-hypbot
yarn
```

If you are using npm instead of yarn, run:
```
npm install
```

### Heroku:
1. Go to [Heroku](https://id.heroku.com/login) and create an account or login
2. Go to your dashboard and create a new app
  * name the app whatever you want, this will not be seen by anyone
  * Choose the region to be the US
3. Once in the deploy tab, select GitHub to be your deployment method
4. Connect your GitHub account and then select the forked repository to connect to
5. Enable automatic deploys

### Amazon:
I still need to figure this out but I'll be doing this soon. My goal is to convert this repo to use serverless, lambdas, and API Gateway from Amazon so this will all be free as long as we don't send more than a million messages a month (assuming we only use one lambda). The threshold could be something like 100,000 messages per month if we use 10 lambdas (which is more realistic), but still doubt we'll even reach that. Even if we do it's like 4 dollars/month as opposed to Heroku's $7.

### GroupMe:
1. Go to [GroupMe for Developers](https://dev.groupme.com/)
2. Sign in using your groupme account that is tied to the groupme you want to put the bot in
3. Click on the bots tab
4. Click on create new bot
5. Fill in the information for your bot:

   For the callback URL, go to your heroku account and copy the domain for your newly created app. This can be found in the settings tab for your app:

   ![Domain Name](https://i.imgur.com/JalNag0.png)

   For the avatar URL, choose your own or you can use the basic ΩΔΦ avatar below from me by using this url:
   [https://i.imgur.com/WczHVac.png](https://i.imgur.com/WczHVac.png)

   ![ODPhi Crest](https://i.imgur.com/WczHVac.png)

6. Once your bot is made, find the Bot ID and copy it to your clipboard. 

![Bot Info](https://i.imgur.com/iuwtzqp.png)

7. Go to setting for your app in Heroku and add a new Config Var. Click on Reveal Config Vars and paste your BOT ID into the value field. In the key field type `BOT_ID`. Add the Config Var

![Config Vars](https://i.imgur.com/Z4Ad5cs.png)

### mLab MongoDB:
1. Go to mlab.com
2. Sign up
3. Create new MongoDB Deployment
4. Choose the Sandbox Plan Type (so it's free to use) and continue.
  * I used amazon and chose my server location to be in virginia
5. Name the database.
  * I named it `hypebotdb`, but it can be anything. You just have to be consistent with your database name whenever you need to use it
6. Click on the Users tab and create a new user.
  * I named it `hypebotadmin` and made the password `1987`

This is the [video](https://youtu.be/GDqtv1eGGpA) I used to setup mongodb, however you should not need it.

### Connect your heroku app (your bot) to mlab (your database)
1. Open the odphi-hypebot repository that you forked on your local machine with the text editor of your choice
2. Open the the `.env` file in your root folder
3. Change the `BOT_ID` to the one you copied into the Config Vars for your Heroku App
4. Find the connection URI for your database above the `Collections` and `Users` tabs. Copy the URI that lets us connect via the standard MongoDB URI to your clipboard.
5. Change the `CONNECTION_STRING` in the `.env` file to be the URI in your clipboard and substitute your username for `<dbuser>` and password for `<dbpassword>` in the URI.
6. Save and push the changes to your forked repository.

You're done! Try sending `HYPE ME` to your group with the bot.

Any time that a message is sent that makes changes to the database (such as `New knight - Jaime` or `Add task - Gaurijo: Find a service site`), those changes will be reflected in the collections tab of mLab.

### Hide your keys:
Still need to do this, but this gist should have the answers:

[https://gist.github.com/jczaplew/8307225](https://gist.github.com/jczaplew/8307225)

### To add custom behavior
- To add cron jobs (code that will run at a certain time) open `app.js` and add your own cron jobs
- To add more regular expression matching, open `lib/bot.js` and add your own regular expression and logic
- To see examples of how you might interact with your MongoDB, look at `lib/hypebotdb/taskbook.js` 


### What happens when a message is sent?
Once groupme gets the message a user sends, it sends it to our callback URL (as well as everyone else in the group). That callback URL is the endpoint for your new app. When the message gets to your app as a POST request, the code in the app is run to check the message for certain patterns. If it finds any matches, it may take further action by sending a message to the database, or if necessary, send a message back to the group.

## Local Testing
For local testing, the app can be run locally using

```
yarn start
```

If using npm:
```
npm start
```

To simulate sending messages as someone in the groupme, a POST request can be sent to whatever port the application is being run on. The "name" field would be the name of the person sending the message and the "text" field would be the message that they send to the group. Below, "Canis" is sending the message "HYPE ME" to the group:

```
curl -X POST -H "Content-Type: application/json" -d '{"name": "Canis", "text": "HYPE ME"}' http://localhost:5000/
```

You can send POST requests using curl regardless of whether the app is running to send messages as the bot:

```
curl -d '{"text" : "We're sending a message to our odphi groupme as our bot!", "bot_id" : "YOUR_UNIQUE_BOT_ID"}' https://api.groupme.com/v3/bots/post
```

## Future Work
- Put bot in mutiple groups (maybe just with a secretary and president), therefore tasks can be added without spamming the main group
- Hide group keys and secrets if the bot is deployed through GitHub
- Calendar Reminders hooked up to Google Calendars
- Connecting with google sheets to record study and service hours and keep a ledger of tasks
- Connect bot to chapter bank account to easily see status and be notified if the chapter card is used

