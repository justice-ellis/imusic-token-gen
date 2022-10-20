require('dotenv').config();
const express = require('express');
const app = express()
const request = require('request');
app.use(express.json());


//const REDIRECT_URI = process.env.REDIRECT_URI
//const client_secret = process.env.CLIENT_SECRET
//const client_id = process.env.CLIENT_ID

client_secret="bc0e428a348f482681dccf462b97cb69"
client_id="2794b6bd6f394507a6adbc64159b2e89"


app.get('/api/v1/auth/login', async(req, res) => {
    const userId = req.body.userId;

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
          grant_type: 'client_credentials'
        },
        json: true
      };
      
      await request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var token = body.access_token;
        }
        console.log(userId, token, body)
        res.json({userId, token, body})
      });
  });

app.listen(9000, () => {
    console.log('app listening at port 9000');
})
