/**
 * @file report.front.js
 * @brief Frontend for report page
 * @author Yuna Chung
 * @version 1.0
 * @date 2023-04-27
 */

function generateReport (canvasID){
    const canvas = canvasID
    const ctx = canvas.getContext("2d")
    convertChart2Image(canvasID)
}

function convertChart2Image(canvasID){
    const canvas = canvasID
    const ctx = canvas.getContext("2d")
    const img = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = img
    link.download = "report.png"
    link.click()
}