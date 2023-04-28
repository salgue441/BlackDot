const express = require('express');
const router = express.Router();

const reportController = require('../controllers/report.controller');

router.post("/admin/generate", reportController.generateTemplate);

module.exports = router;