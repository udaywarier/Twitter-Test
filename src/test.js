const twitter = require('twit');
const process = require('process');
const child_process = require('child_process');
const fs = require('fs');
const config = require('../config');

// Create a connetion to the Twitter API.
let client = new twitter(config);

// Logfile which will contain information on every tweet the bot has ever posted. This can be changed by different users to suit their own machine.
let filepath = './tweet_logs.txt';

// Need to pass in a command-line argument that is used to build the search query.
if(process.argv.length < 2)
{
    console.log('Error: pass in a keyword to be used to query a random tweet!');
}

// If we have a command-line argument, use it to post the new tweet.
else
{
    post_tweet(process.argv[2]);
}

/**
 * Gets a random tweet based on the keyword input, posts it, and logs the result in the specified logfile.
 * @param {string} keyword the keyword that is used to build the search query.
 * @outputs error message if something goes wrong, success message if everything works.
 */
function post_tweet(keyword)
{
    let get_params = 
    {
        q: keyword,
        count: 10,
        lang: 'en'
    };

    client.get('search/tweets', get_params, function(err, data, response) 
    {
        if(err)
        {
            console.log(err);
        }

        else
        {
            let original_tweet = 
            {
                original_timestamp: data.statuses[0].created_at,
                original_user_name: data.statuses[0].user.name,
                original_user_screen_name: data.statuses[0].user.screen_name,
                original_status: data.statuses[0].text
            }

            let new_tweet = 
            {
                timestamp: new Date(),
                user_name: 'Botty McBotface',
                user_screen_name: 'iamarobot69',
                status: 'I am a bot! Here is my tweet: ' + reverse_tweet(original_tweet.original_status)
            };

            client.post('statuses/update', {status: new_tweet.status}, function(err, data, response)
            {
                if(err)
                {
                    console.log(err);
                }

                else
                {
                    console.log('Tweet posted successfully!');
                    write_to_file(original_tweet, new_tweet, filepath);
                }
            });
        }
    });
}

/**
 * Adds information about the original tweet and the new tweet the bot made to the given tweet log file, pushes the updated log file to the git repo.
 * @param {Object} original_tweet the original tweet that a human Twitter user made.
 * @param {Object} new_tweet the tweet that the bot made.
 * @param {string} filepath path to the log file.
 * @outputs error message if something goes wrong, success message if everything works.
 */
function write_to_file(original_tweet, new_tweet, filepath)
{
    let tweet_log = 
    {
        source_tweet: original_tweet,
        bot_tweet: new_tweet
    }

    let tweet_log_to_string = JSON.stringify(tweet_log) + '\n';

    fs.writeFile(filepath, tweet_log_to_string, {flag: 'a'}, function(err)
    {
        if(err)
        {
            console.log(err);
        }

        else
        {
            console.log("Tweet logged successfully!");

            child_process.exec('git add . && git commit -m \'Updated log file\' && git push origin master', function(err, stdout, stderr)
            {
                if(err)
                {
                    console.log(err);
                }

                else
                {
                    console.log(stdout);
                }
            });
        }
    });
}

/**
 * Takes a string and reverses each word individually while keeping spaces intact.
 * ex: 'test' => 'tset'
 * ex: 'hello, world!' => ',olleh !dlrow' 
 * @param {string} str string to be reversed in this way.
 * @returns the result of the reversal.
 */
function reverse_tweet(str)
{
    let str_to_array = [...str];
    let reversed_str = '';
    let reversed_word = '';

    for(let i = 0; i < str_to_array.length; i++)
    {
        if(str_to_array[i] === ' ')
        {
            reversed_str += reversed_word + ' ';
            reversed_word = '';
        }

        else
        {
            reversed_word = str_to_array[i] + reversed_word;
        }
    }

    reversed_str += reversed_word;

    return reversed_str;
}