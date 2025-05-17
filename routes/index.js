const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

let isRunning = false;
let startTime = null;

router.get('/', async (req, res) => {
  const sessions = await Session.find().sort({ startTime: -1 });
  res.render('index', { isRunning, startTime, sessions });
});

router.post('/start', (req, res) => {
  if (!isRunning) {
    startTime = new Date();
    isRunning = true;
  }
  res.redirect('/');
});

router.post('/stop', async (req, res) => {
  if (isRunning) {
    const endTime = new Date();
    const duration = (endTime - startTime) / 1000;

    const session = new Session({ startTime, endTime, duration });
    await session.save();

    isRunning = false;
    startTime = null;
  }
  res.redirect('/');
});

router.post('/reset', async (req, res) => {
  isRunning = false;
  startTime = null;
  await Session.deleteMany({});
  res.redirect('/');
});

module.exports = router;
