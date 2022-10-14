require('dotenv').config();
const express = require('express');
const app = express()
const request = require('request');
app.use(express.json());


REDIRECT_URI=process.env.REDIRECT_URI
client_secret=process.env.client_secret
client_id=process.env.client_id


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
