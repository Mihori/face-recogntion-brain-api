const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const handleSignin = require('./controllers/signin');
const handleRegister = require('./controllers/register');
const handleProfile = require('./controllers/profile');
const handleImage = require('./controllers/image');

const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'gabordobrozemszky',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('working');
});

app.post('/signin', (req, res) => handleSignin(req, res, db, bcrypt));

app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt));

app.get('/profile/:id', (req, res) => handleProfile(req, res, db));

app.put('/image', (req, res) => handleImage(req, res, db));

app.listen(5000, () => {
  console.log('Server is running');
});