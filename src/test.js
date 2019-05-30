const twitter = require('twit');
const process = require('process');
const fs = require('fs');
const config = require('../config');

// Create a connetion to the Twitter API.
let client = new twitter(config);

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
 * Gets a random tweet using a search query based on the input parameter, reverses each word in that tweet (keeping spaces intact) and then posts the reversed tweet.
 * @param {string} keyword the keyword that is used to build the search query.
 * @returns error message if something goes wrong, success message if everything works.
 */
function post_tweet(keyword)
{
    let get_params = 
    {
        q: keyword,
        count: 2,
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
            let tweet = data.statuses[0].text;

            let post_params = 
            {
                status: 'I am a bot! Here\'s my tweet: ' + reverse_tweet(tweet)
            };

            client.post('statuses/update', post_params, function(err, data, response)
            {
                if(err)
                {
                    console.log(err);
                }

                else
                {
                    console.log('Tweet posted successfully!');
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