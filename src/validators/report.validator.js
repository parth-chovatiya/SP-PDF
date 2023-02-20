exports.reportValidator = async (ctx, next) => {
  try {
    const { report } = ctx.request.body;
    ctx.assert(report, 400, "Please insert report data.");

    const acceptedKeys = [
      "id",
      "name",
      "w",
      "h",
      "x",
      "y",
      "chartId",
      "isBounded",
      "isDisable",
    ];
    const nameEnum = [
      "Engagement Sights",
      "Content Type",
      "Audience Demographic",
      "Daily tweets",
      "Tweet Frequency",
      "Active Fans",
    ];
    const requiredField = ["id", "name", "w", "h", "x", "y", "chartId"];

    for (let element of report) {
      const keys = Object.keys(element);

      for (let key in element) {
        // filter accepted keys
        ctx.assert(acceptedKeys.includes(key), 400, `${key} is not allowed.`);

        // check if name is one of the type of 'nameEnum'
        if (key === "name") {
          ctx.assert(
            nameEnum.includes(element[key]),
            400,
            `${element[key]} is not allowed.`
          );
        }

        // Check required value
        for (let field of requiredField) {
          ctx.assert(keys.includes(field), 400, `${field} is required.`);
        }
      }
    }

    await next();
  } catch (error) {
    ctx.status = error.statusCode || 400;
    ctx.body = {
      message: error.message || "Something went wrong.",
    };
  }
};
