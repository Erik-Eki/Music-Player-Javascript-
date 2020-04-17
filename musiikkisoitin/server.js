const express = require('express');
const request = require('request');
const Database = require('./model/database.js');
const BodyParser = require('body-parser');
const cors = require('cors');

var app = express();

const connection = new Database();
const port = 8080;
// CORS-middlewaren käyttöönotto
app.use(cors());

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
// Sallitaan pääsy selaimen tarvitsemiin tiedostoihin
app.use(express.static(__dirname + '/client'));
//Estää liian datan lukemisen servulle
app.use(express.json({ limit: '1mb' }));

/*
app.get('/api/v1/presidents', async (req, res) => {
  try {
  connection.getAll(function (presidents) {
    res.send(presidents);
  }, req.body);
  } catch (err) {
    res.status(400).send(err);
  }
});
*/
/*
app.post('/api/v1/presidents', async (req, res) => {
  console.log('POST /api/v1/presidents', req.body);
  try {
    connection.addPresidents(function (response) {
      res.send(response);
    }, req.body);
    res.send('presidents added');
  } catch (err) {
    res.status(400).send(err);
  }
});
*/

app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}!`));