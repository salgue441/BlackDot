const pdf = require("html-pdf");
const express = require("express");
const router = express.Router();

const generateTemplate = (req, res) => {
    const { graphImage } = req.body;
    console.log(graphImage)
};

module.exports = { generateTemplate };
