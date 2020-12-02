const Twitter = require('twitter');
const Sheet = require('./sheet');

(async function () {
    // Connect to twitter via api
    const client = new Twitter({
        consumer_key: 'xxxxxxxxxx', // Add consumer_key
        consumer_secret: 'xxxxxxxxxx', // Add consumer secret
        access_token_key: 'xxxxxxxxxx', // Add token key
        access_token_secret: 'xxxxxxxxxx', // Add token secret
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
