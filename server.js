require('dotenv').config()
;('use strict')
const express = require('express')
const path = require('path')
const serverless = require('serverless-http')
const app = express()
const bodyParser = require('body-parser')

const router = express.Router()

const Twit = require('twit')
const T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
})

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write('<h1>Starting twitter-bot</h1>')
  const stream = T.stream('statuses/filter', {
    track: ['hey invite', 'hey code', '#hey', 'hey.com'],
  })

  stream.on('tweet', function (tweet) {
    match_res = tweet.text.match(/\b[A-z0-9]{7}\b/g)
    res.write(tweet.text)
    if (match_res != null) {
      res.write('IMPORTNAT: ' + match_res)
    }
  })
  res.end()
})
router.post('/', (req, res) => res.json({ postBody: req.body }))

app.use(bodyParser.json())
app.use('/.netlify/functions/server', router) // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')))

module.exports = app
module.exports.handler = serverless(app)

app.listen(3000, () => console.log('Local app listening on port 3000!'))
