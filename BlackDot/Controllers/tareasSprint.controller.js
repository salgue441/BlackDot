/**
 * @file tareasSprint.controller.js
 * @brief Controlador de tareas Sprint
 * @author Olimpia Garcia
 * @date 2023-03-28
 * @version 1.0
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

const issue = require("../Models/issue.model");
const Sprint = require("../Models/sprint.model");
const sprintIssue = require("../Models/sprint-issue.model");
const { request } = require("express");
const Epica = require("../models/epica.model");

// exports.getAllSprint = async(req, res) => 
// {
//     try{
//         await Sprint.getAll().then((sprint) => {
//             res.render(
//                 path.join(_dirname, "../Views/Static/")
//             )
//         }
//     }
// }