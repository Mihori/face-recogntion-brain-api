const express = require('express');

const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'gabordobrozemszky',
    password : '',
    database : 'smart-brain'
  }
});

db.select('*').from('users').then(console.log);

const app = express();

app.get('/', (req, res) => {
  res.send('working');
});

app.post('/signin', (req, res) => {
  
});

app.post('/register', (req, res) => {
  const { email, name, passwords } = req.body;
  db('users')
    .returning('*')
    .insert({
      email,
      name,
      joined: new Date(),
    })
    .then(user => res.json(user))
    .catch(error => res.status(400).json(error))
});

app.listen(3000, () => {
  console.log('Server is running');
});