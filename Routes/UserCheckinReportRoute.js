const express = require('express');
const route = express.Router();

const userCheckinReportController = require('../Controllers/UserCheckinReportController');

route.get('/reportuserlate', userCheckinReportController.reportUserLate)
route.post('/:id', userCheckinReportController.userCheckin);

module.exports = route;