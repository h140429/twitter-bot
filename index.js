const Twitter = require('twitter');
const Sheet = require('./sheet');

(async function () {
    // Connect to twitter via api
    const client = new Twitter({
        consumer_key: 't5TRDApjt8rKe6cgzp1KdJ6Lc',
        consumer_secret: 'AM2HzlKfWfeuoeKvRcNmr2UFm8BEHlEQs5HxOEeJt77V9kZbOg',
        access_token_key: '1326450971132694528-Ez3GgYJbG0nCMcIQ9I9zgQ2lrLiKKN',
        access_token_secret: 'KscbiHVilXt5ff9RKJv1zvUX0xlCg3DFal9rUOtUHQY37',
        // consumer_key: process.env.TWITTER_CONSUMER_KEY,
        // consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        // access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        // access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });

    // Pull next tweet from sheet
    const sheet = new Sheet();
    await sheet.load();
    const tweets = await sheet.getRows();
    const status = tweets[0].message;

    // Send tweet
    client.post('statuses/update', { status }, function (
        error,
        tweet,
        response
    ) {
        if (error) throw error;
        console.log(tweet); // Tweet body.
    });

    // Remove tweet from sheet
    await tweets[0].delete();

    console.log('tweeted', tweets[0].message);
})();

// Write logic for when running out of rows in the Google Sheet
// Make bot post on specific hashtags
