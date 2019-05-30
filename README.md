# Twitter-Test 

This is a simple Twitter bot that picks a tweet using a user-provided keyword and tweets out the string that results from reversing each word in the tweet while keeping spaces intact. It is meant to serve as an introduction to the Twitter API and a building block to develop more complicated bots in the future.

To run the bot, navigate to the src directory and simply run 'node test.js [keyword]', where [keyword] is a command-line argument that specifies around which keyword the query is to be built, or use 'npm start', which uses the default value [keyword] = 'dog'.