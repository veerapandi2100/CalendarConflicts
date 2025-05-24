const express = require('express');
const {
  checkConflictsHandler,
  suggestTimesHandler
} = require('../controllers/calendarController');

const {
  validateCalendarRequest
} = require('../middleware/validateCalendar');

const router = express.Router();

router.post('/check-conflicts', validateCalendarRequest, checkConflictsHandler);
router.post('/suggest-times', validateCalendarRequest, suggestTimesHandler);

module.exports = router;
