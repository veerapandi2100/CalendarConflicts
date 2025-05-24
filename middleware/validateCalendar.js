const { body, validationResult } = require('express-validator');

const commonEventValidators = [
  body('proposedEvent')
    .exists().withMessage('proposedEvent is required')
    .isObject().withMessage('proposedEvent must be an object'),

  body('proposedEvent.start')
    .exists().withMessage('proposedEvent.start is required')
    .isString().withMessage('proposedEvent.start must be a string'),

  body('proposedEvent.end')
    .exists().withMessage('proposedEvent.end is required')
    .isString().withMessage('proposedEvent.end must be a string'),

  body('proposedEvent.participants')
    .exists().withMessage('participants are required')
    .isArray({ min: 1 }).withMessage('participants must be a non-empty array'),

  body('existingEvents')
    .exists().withMessage('existingEvents is required')
    .isArray().withMessage('existingEvents must be an array'),

  body('bufferMinutes')
    .optional()
    .isInt({ min: 0 }).withMessage('bufferMinutes must be a positive integer'),

  body('workingHours')
    .optional()
    .isObject().withMessage('workingHours must be an object'),

  body('workingHours.start')
    .optional()
    .isString().withMessage('workingHours.start must be a string'),

  body('workingHours.end')
    .optional()
    .isString().withMessage('workingHours.end must be a string')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.validateCalendarRequest = [
  ...commonEventValidators,
  handleValidationErrors
];
