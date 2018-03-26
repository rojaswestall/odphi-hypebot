# odphi-hypebot
ODPhi GroupMe HypeBot2.0

- Deployed with Heroku, running on one dyno but can change to run on two
- Sends messages at 8:07 using cron jobs (can change to run scheduled/standing messages to run on two dynos)
- Identifies regular expressions
- Responds based on keyword
- Responds based on user


## For set up





### GroupMe:


### Heroku:

To keep variables secret (like keys and secrets), .env and .gitignore files are used so that no one can see it on GitHub. A .env file needs to be made with your BOT_ID that was made when you made your groupme bot. From the command line:
1) Navigate to the directory for the bot
2) 







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



