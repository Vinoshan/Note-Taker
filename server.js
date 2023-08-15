const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors'); 

const PORT = process.env.PORT || 3001;

// Middleware to enable CORS
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(express.static('public'));

// Middleware to parse JSON body
app.use(express.json());

// Route for the landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for the notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Read notes from db.json
app.get('/api/notes', (req, res) => {
  const dbFilePath = path.join(__dirname, 'db', 'db.json');
  const notes = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
  res.json(notes);
});

// Create a new note
app.post('/api/notes', (req, res) => {
  const newNote = { id: uuidv4(), ...req.body };
  const dbFilePath = path.join(__dirname, 'db', 'db.json');
  const notes = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
  notes.push(newNote);
  fs.writeFileSync(dbFilePath, JSON.stringify(notes));
  res.json(newNote);
});

// Delete a note by ID
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const dbFilePath = path.join(__dirname, 'db', 'db.json');
  const notes = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
  const updatedNotes = notes.filter((note) => note.id !== id);
  fs.writeFileSync(dbFilePath, JSON.stringify(updatedNotes));
  res.json({ message: 'Note deleted successfully' });
});
