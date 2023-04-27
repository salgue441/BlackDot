/**
 *
 */

const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")

const { jsPDF } = require("jspdf")
router.use(bodyParser.json({ limit: "500mb" }))
router.use(bodyParser.urlencoded({ limit: "500mb", extended: true }))

const Retro = require("../Controllers/retroalimentacion.controller")
router.get("/verRespuestas/:id", Retro.getCurretRetroalimentacion)
router.get("/verRespuestas", Retro.getCurretRetroalimentacion)

router.get("/retroalimentacion", Retro.getRegistrarRespuestas)

router.post("/enviado", Retro.postRegistrarRespuestas)

// Fetches the data for the graph (Not really used to display content)
router.get("/respuestasRetro", Retro.getCurretRetroalimentacionAPI)

// Sprint Actual
const SprintActual = require("../Controllers/metricaActual.controller")
router.get("/metricasSprint", SprintActual.getActual)

// Fetches all the epicas and their metrics for the actual sprint
router.get("/sprintData", SprintActual.getActualAPI)

const Accionable = require("../Controllers/accionable.controller")
router.get("/accionables", Accionable.getRegistrarAprobacion)
router.post("/admin/saveAccionables", Accionable.saveAccionable)

router.post("/generatePDF", (req, res) => {
  console.log("PDF generated")
  const chartImage = req.body.chartImage
  const pdf = new jsPDF()
  pdf.addImage(chartImage, "PNG", 0, 0, 200, 100)
  pdf.save("my-pdf-document.pdf")
})

module.exports = router
