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
    result: JSON.stringify(rows),
  });
});

app.get('/all-capsules', async (req, res) => {
  axios
    .get('https://api.spacexdata.com/v4/capsules')
    .then((response) => {
      res.status(response.status);
      res.send({ data: response.data });
    })
    .catch((error) => {
      console.error(error);
      res.status(404);
      throw new Error('Something went wrong!');
    });
});

app.get('/landing-pad', async (req, res) => {
  const { id } = req.query;
  console.log('🚀 ~ file: app.js ~ line 37 ~ app.get ~ id', typeof id);

  if (typeof id !== 'string') {
    throw new Error('id format is incorrect!');
  }

  axios
    .get(`https://api.spacexdata.com/v4/landpads/${id}`)
    .then((response) => {
      const { id, full_name, status, locality, region } = response.data;

      res.status(response.status);
      res.send({ data: { id, fullName: full_name, status, locality, region } });
    })
    .catch((error) => {
      console.error(error);
    //   res.status(401).json({ message: 'The landing pad id is not found!' });
      res.status(401).send('The landing pad id is not found!');
    //   throw new Error('The landing pad id is not found!');
    });
});

app.listen('4001');
console.log(
  `Listening on port: 4000, wait for the development server to be up...`
);
