const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Session = require('./models/Session');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/stopwatchDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let isRunning = false;
let startTime = null;

app.get('/', async (req, res) => {
  const sessions = await Session.find().sort({ startTime: -1 });
  res.render('index', { isRunning, startTime, sessions });
});

app.post('/start', (req, res) => {
  if (!isRunning) {
    isRunning = true;
    startTime = new Date();
  }
  res.redirect('/');
});

app.post('/stop', async (req, res) => {
  if (isRunning) {
    const duration = Math.floor((new Date() - startTime) / 1000);
    await Session.create({ startTime, duration });
    isRunning = false;
    startTime = null;
  }
  res.redirect('/');
});

app.post('/reset', async (req, res) => {
  await Session.deleteMany({});
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
