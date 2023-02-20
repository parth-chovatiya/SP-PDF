const { ObjectId } = require("mongodb");

const { getDB } = require("../DB/connectDB");
const { isValidObjectId } = require("../utils/validation_utils");

// @route   POST /api/v1/report/create
// @desc    update report
// @access  Private
exports.createReport = async (ctx) => {
  try {
    const Report = await getDB();
    const report = await Report.collection("Reports").insertOne({
      report: ctx.request.body.report,
    });

    ctx.status = 201;
    ctx.body = {
      message: "Report created.",
      report,
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      message: "Something went wrong.",
    };
  }
};

// @route   PUT /api/v1/report/update/:reportId
// @desc    update report
// @access  Private
exports.updateReport = async (ctx) => {
  try {
    const { reportId } = ctx.params;
    ctx.assert(isValidObjectId(reportId), 400, "Enter valid reportId");

    const Report = await getDB();
    const report = await Report.collection("Reports").findOneAndUpdate(
      { _id: new ObjectId(reportId) },
      { $set: { report: ctx.request.body.report } },
      { retuenDocument: "after" }
    );

    ctx.status = 200;
    ctx.body = {
      message: report.lastErrorObject.updatedExisting
        ? "Report updated."
        : "No Report Found.",
      report: report.value ? report.value : [],
    };
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    ctx.body = {
      message: "Something went wrong.",
    };
  }
};

// @route   GET /api/v1/report/fetch/:reportId
// @desc    fetch report
// @access  Private
exports.fetchReport = async (ctx) => {
  try {
    const { reportId } = ctx.params;

    const Report = await getDB();
    const report = await Report.collection("Reports").findOne({
      _id: new ObjectId(reportId),
    });

    ctx.status = 200;
    ctx.body = { message: "Report fetched.", report: report || [] };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      message: "Something went wrong.",
    };
  }
};

// ---------------

// @route   PUT /api/v1/report/save/
// @desc    save report
// @access  Private
exports.saveReport = async (ctx) => {
  try {
    const { reportId, report } = ctx.request.body;

    ctx.assert(
      !reportId || isValidObjectId(reportId),
      400,
      "Enter valid reportId"
    );

    const Report = await getDB();
    const savedReport = await Report.collection("Reports").findOneAndUpdate(
      { _id: new ObjectId(reportId) },
      { $set: { report: report } },
      { upsert: true, returnDocument: "after" }
    );

    ctx.status = 200;
    ctx.body = {
      message: savedReport.lastErrorObject.updatedExisting
        ? "Report updated."
        : "Report Inserted.",
      report: savedReport.value,
    };
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    ctx.body = {
      message: error.message || "Something went wrong.",
    };
  }
};
