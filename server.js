const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('views'));

app.get('/', (req, res) => {
  res.send("Sup");
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/login.html'));
});

app.listen(3000, () => console.log("Yo, it's up"));