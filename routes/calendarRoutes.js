const express = require('express');
const {
  checkConflictsHandler,
  suggestTimesHandler
} = require('../controllers/calendarController');

const router = express.Router();

router.post('/check-conflicts', checkConflictsHandler);
router.post('/suggest-times', suggestTimesHandler);

module.exports = router;
