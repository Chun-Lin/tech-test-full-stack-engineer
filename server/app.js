const dbPool = require('./db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', async (req, res) => {
    const rows = await dbPool.query('SELECT * FROM spaceData');
    res.status(200);
    res.send({
        result: JSON.stringify(rows)
    });
});

app.get('/all-capsules', async (req, res) => {
  axios
    .get('https://api.spacexdata.com/v4/capsules')
    .then((response) => {
      console.log(`statusCode: ${response.status}`);
      console.log(response);
      res.status(response.status);
      res.send({ data: response.data });
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen('4001');
console.log(`Listening on port: 4000, wait for the development server to be up...`);