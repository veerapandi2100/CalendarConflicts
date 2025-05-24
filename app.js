const express = require('express');
const bodyParser = require('body-parser');
const calendarRoutes = require('./routes/calendarRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/api/calendar', calendarRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
