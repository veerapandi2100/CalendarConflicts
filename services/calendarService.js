const dayjs = require("dayjs")
const isBetween = require('dayjs/plugin/isBetween');
const { WORK_HOURS } = require('../config/default');

dayjs.extend(isBetween);

function parseTime(time) {
  const [hour, minute] = time.split(":").map(Number);
  return dayjs().hour(hour).minute(minute).second(0);
}


function hasOverlap(start1, end1, start2, end2) {
  return start1.isBefore(end2) && end1.isAfter(start2);
}

function checkConflicts(proposed, existingEvents, bufferMinutes) {
    console.log("====>>>>", proposed, existingEvents, bufferMinutes)
  const conflicts = [];
  const propStart = parseTime(proposed.start).subtract(bufferMinutes, 'minute');
  const propEnd = parseTime(proposed.end).add(bufferMinutes, 'minute');

  for (const event of existingEvents) {
    const eventStart = parseTime(event.start);
    const eventEnd = parseTime(event.end);

    const commonParticipants = proposed.participants.filter(p =>
      event.participants.includes(p)
    );

    if (commonParticipants.length > 0 &&
        hasOverlap(propStart, propEnd, eventStart, eventEnd)) {
      conflicts.push({ event, commonParticipants });
    }
  }
  console.log("====>>>", conflicts);
  return conflicts;
}

function suggestTimes(proposed, existingEvents, bufferMinutes) {
    console.log("Sugg====>>>>", proposed, existingEvents, bufferMinutes)
  const suggestions = [];
  const propStart = parseTime(proposed.start);
  const duration = parseTime(proposed.end).diff(propStart, 'minute');
  let currentTime = propStart;
  let attempts = 0;

  while (suggestions.length < 3 && attempts < 20) {
    const start = currentTime.add(bufferMinutes, 'minute');
    const end = start.add(duration, 'minute');

    const withinHours = start.hour() >= WORK_HOURS.start && end.hour() < WORK_HOURS.end;

    const testEvent = {
      start: start.format('HH:mm'),
      end: end.format('HH:mm'),
      participants: proposed.participants
    };

    if (withinHours && checkConflicts(testEvent, existingEvents, bufferMinutes).length === 0) {
      suggestions.push(testEvent);
    }

    currentTime = currentTime.add(15, 'minute');
    attempts++;
  }

  return suggestions;
}

module.exports = {
  checkConflicts,
  suggestTimes
};
