require('dotenv').config()
const Twit = require('twit')
const T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
})

const stream = T.stream('statuses/filter', {
  track: ['hey invite', 'hey code', '#hey', 'hey.com'],
})

stream.on('tweet', function (tweet) {
  match_res = tweet.text.match(/\b[A-z0-9]{7}\b/g)
  console.log(tweet.text)
  if (match_res != null) {
    console.log('IMPORTNAT: ' + match_res + '\r\n--')
  }
})
