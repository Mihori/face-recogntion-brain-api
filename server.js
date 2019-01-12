const express = require('express');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'gabordobrozemszky',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();

app.get('/', (req, res) => {
  res.send('working');
});

app.post('/signin', (req, res) => {
  
});

app.listen(3000, () => {
  console.log('Server is running');
});