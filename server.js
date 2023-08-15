const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(express.static('public'));

const path = require('path');

//Route for the landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Route for the notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'public/notes.html'));
});