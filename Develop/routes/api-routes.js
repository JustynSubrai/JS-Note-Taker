const path = require('path');
const fs = require('fs');

let uniqid = require('uniqid');

module.exports = function(app) {
  app.get('/api/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '../db/db.json'));
  });

  app.post('/api/notes', function(req, res) {
    let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
    let newNote = {
      id: uniqid(),
      title: req.body.title,
      text: req.body.text
    };
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes));
    res.json(newNote);
  });

  app.delete('/api/notes/:id', function(req, res) {
    let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
    let newNotes = notes.filter(note => note.id !== req.params.id);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(newNotes));
    res.json(newNotes);
  });
};