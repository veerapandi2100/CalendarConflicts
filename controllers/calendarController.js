const { checkConflicts, suggestTimes } = require('../services/calendarService');
const { BUFFER_MINUTES } = require('../config/default');

exports.checkConflictsHandler = (req, res) => {
  const { proposedEvent, existingEvents, bufferMinutes = BUFFER_MINUTES } = req.body;
  const conflicts = checkConflicts(proposedEvent, existingEvents, bufferMinutes);
  res.json({ conflicts });
};

exports.suggestTimesHandler = (req, res) => {
  const { proposedEvent, existingEvents, bufferMinutes = BUFFER_MINUTES } = req.body;
  const suggestions = suggestTimes(proposedEvent, existingEvents, bufferMinutes);
  res.json({ suggestions });
};
