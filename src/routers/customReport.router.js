const KoaRouter = require("koa-router");
const {
  fetchReport,
  updateReport,
  createReport,
  saveReport,
} = require("../controllers/report.contoller");
const { reportValidator } = require("../validators/report.validator");

const router = new KoaRouter({ prefix: "/report" });

// create report
router.post("/create", reportValidator, createReport);

// update Report
router.put("/update/:reportId", reportValidator, updateReport);

// fetch Report
router.get("/fetch/:reportId", fetchReport);

// -----
router.put("/save", reportValidator, saveReport);

module.exports = router;
