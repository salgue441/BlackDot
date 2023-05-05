const express = require("express");
const router = express.Router();

const reportController = require("../controllers/report.controller");
router.post("/renderTemplate", reportController.renderTemplate);

module.exports = router;
