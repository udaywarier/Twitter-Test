const process = require('process');
const express = require('express');
const twitter = require('twit');
const config = require('../config');

let client = new twitter(config);

// console.log(T);
// console.log(process.argv);
// console.log(express);

//TODO: Pick a random tweet, reverse every string in the tweet while keeping spaces intact, and then tweet that.

client.get('search/tweets', { q: 'a', count: 10 }, function(err, data, response) 
{
    if(err)
    {
        console.log(err);
    }

    else
    {
        data.statuses.forEach(function(element)
        {
            console.log('TEXT: ' + element.text);
        });
    }
});

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