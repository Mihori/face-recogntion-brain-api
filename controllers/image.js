const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '78b7ca4963c74bb49178083936bc98b5'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(error => res.status(400).json('Unable to work with API'))
}
const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(error => res.status(400).json('Unable to get entries'))
}

module.exports = { handleImage, handleApiCall };
