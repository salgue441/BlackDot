/**
 * @file report.controller.js
 * @brief Controller for report page
 * @author Yuna Chung
 * @version 1.0
 * @date 2023-04-27
 */

 const pdf = require("html-pdf");
 const express = require("express");
 const ejs = require("ejs");
 const path = require("path");
 const { response } = require("express");
 const fs = require("fs");
 
 const router = express.Router();
 
 const generateTemplate = (req, res) => {
   const { graphImage } = req.body;
 
   const data = {
     title: "Desempenio Sprint Actual",
     graphImage: graphImage, // graphImage.toString()
     pageNumber: 1,
     totalPages: 1,
   };
 
   const templatePath = path.join(
     __dirname,
     "../views/static/reports/template.ejs"
   );
 
   ejs.renderFile(templatePath, data, (err, html) => {
     if (err) {
       console.log(err);
       res.status(500).send("An error occurred");
     } else {
       const options = { format: "Letter" };
 
       pdf.create(html, options).toBuffer((err, buffer) => {
         if (err) {
           console.log(err);
           res.status(500).send("An error occurred");
         } else {
           res.setHeader("Content-type", "application/pdf");
           res.setHeader(
             "Content-Disposition",
             "attachment; filename=report.pdf"
           );
 
           res.send(buffer);
         }
       });
     }
   });
 };
 
 const generatePDF = (req, res) => {
   const { graphImage } = req.body;
 
   const data = {
     title: "Desempenio Sprint Actual",
     graphImage: graphImage,
     pageNumber: 1,
     totalPages: 1,
   };
 
   ejs.renderFile(
     path.join(__dirname, "../views/static/reports/template.ejs"),
     data,
     (err, html) => {
       if (err) {
         console.log(err);
         res.status(500).send("An error occurred");
       } else {
         const options = { format: "Letter" };
 
         pdf.create(html, options).toFile("report.pdf", (err, result) => {
           if (err) {
             console.log(err);
             res.status(500).send("An error occurred");
           } else {
             console.log(result);
             const filePath = result.filename;
             const fileStream = fs.createReadStream(filePath);
 
             res.setHeader("Content-type", "application/pdf");
             res.setHeader(
               "Content-Disposition",
               "attachment; filename=report.pdf"
             );
 
             fileStream.pipe(res);
           }
         });
       }
     }
   );
 };
 
 module.exports = {
   generateTemplate,
   generatePDF,
 };