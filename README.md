# Twitter-Test 

This is a simple Twitter bot that picks a tweet using a user-provided keyword and tweets out something related. It is meant to serve as an introduction to the Twitter API and a building block to develop more complicated bots in the future, as well as a way for me to familiarize myself with Git, Node, and working with various Javascript tools and libraries.

The bot will pick a random tweet from a stream of tweets obtained using the user-provided keyword. It will then reverse every word in the tweet, preserving spaces, and then tweet that out from its own account, Botty McBotface. After this, it writes information to a logfile about the random tweet it found, as well as the new tweet that it sent out itself. The bot pushes the appropriate changes to the GitHub repository every time the logfile is updated, so as long as the git configuration is set up beforehand the changes do not need to be committed manually.

To run the bot, navigate to the src directory and simply run 'node test.js [keyword]', where [keyword] is a command-line argument that specifies around which keyword the query is to be built. The bot defaults to [keyword] = 'dog' when no command-line argument is passed, or when the npm start script is run. The default logfile is in the same directory as 'test.js' and is called 'tweet_logs.txt'. 