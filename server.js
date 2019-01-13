const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

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

app.use(cors());
app.use(bodyParser.json());

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
    .then(user => res.json(user[0]))
    .catch(error => res.status(400).json('Unable to register'))
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({ id })
    .then(user => {
      if (user.length) {
      res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entires', 1)
    .returning('entires')
    .then(entries => res.json(entires[0]))
    .catch(error => res.status(400).json('Unable to get entries'))
});

app.listen(3000, () => {
  console.log('Server is running');
});