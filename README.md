# odphi-hypebot
ODPhi Alpha Alpha GroupMe HypeBot2.0

- Responds to messages based on key words and the user who sends the message
- Sends messages at 8:07 and on special occassions
- Has a built in task manager that keeps track of tasks for each user
- Allows group to save content as pins and then view pins at anytime

Instructions on how to use the bot from the group message:

Add new Knight to TaskBook: "New Knight - <knightname>"
Remove a Knight from TaskBook: "Remove Knight - <knightname>"
Add a task for a Knight: "Add Task - <knightname>: TASK"
Remove a task for a Knight: "Remove Task - <knightname>: TASK#"
See all tasks: "Show Tasks"
See tasks for a bro: "Show Tasks - <knightname>"
See stats: "Show Stats"
See stats for a bro: "Show Stats - <knightname>"
Instructions: "Instructions"


- A groupme bot that uses node.js to interact with a groupme group message
- Deployed with Heroku, running on one web dyno
- Connects to a mongo database to hold tasks and pins
- Identifies key words using regular expressions

Questions??? Email me at <rojaswestall@gmail.com>


## For set up

*Node and npm must be installed:*

[https://nodejs.org/en/download/](https://nodejs.org/en/download/)

*The Heroku CLI must be installed:*

[https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

or if you have homebrew installed on mac:
```
brew install heroku/brew/heroku
```

### GitHub:
1) Clone this repository onto your local machine:
Navigate to the directory that you want to keep this repository, then clone the repo and install dependencies:
```
git clone https://github.com/rojaswestall/odphi-hypebot.git
cd odphi-hypbot
npm install
```


### GroupMe:
1) Go to [https://dev.groupme.com/](https://dev.groupme.com/)
2) Sign in using your groupme account that is tied to the groupme you want to put the bot in
3)


### Heroku:

To keep variables secret (like keys and secrets), .env and .gitignore files are used so that no one can see it on GitHub. A .env file needs to be made with your BOT_ID that was made when you made your groupme bot. From the command line:
1) Navigate to the cloned repository for the bot that's been downloaded to your computer (using terminal)
2) Once there use the following command to make the .env file and open it with your preferred textEditior:

```
touch .env
nano .env
```

https://gist.github.com/jczaplew/8307225






### mLab MongoDB:

1) Go to mlab.com
2) Sign up
3) Create new MongoDB Deployment
4) Choose the Sandbox Plan Type (so it's free to use) and continue
- I used amazon and chose my server location to be in virginia
5) Name the database.
- I named it "hypebotdb", but it can be anything. You just have to be consistent with your database name whenever you need to use it
6) Click on your new mongodb instance and create a new collection. Name it "tasks"
7) Click on the Users tab and create a new user.
- I named it hypebotadmin and made the password 1987

[This is the video I used to setup mongodb](https://youtu.be/GDqtv1eGGpA)


## Local Testing

For local testing, the app can be run locally using
```
npm start
```
To simulate sending messages as someone in the groupme, a POST request can be sent to whatever port the application is being run on. The "name" field would be the name of the person sending the message and the "text" field would be the message that they send to the group. Below, "Canis" is sending the message "HYPE ME" to the group:

```
curl -X POST -H "Content-Type: application/json" -d '{"name": "Canis", "text": "HYPE ME"}' http://localhost:5000/
```

You can send POST requests using curl regardless of whether the app is running to send messages as the bot:

```
curl -d '{"text" : "We're sending a message to our odphi groupme!", "bot_id" : "YOUR_UNIQUE_BOT_ID"}' https://api.groupme.com/v3/bots/post
```


If you inlcude your bot ID in the .env file and your access token int

If you make requests that make changes to the database you should be able to see those changes under collections in mlab

