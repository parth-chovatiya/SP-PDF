const KoaRouter = require("koa-router");
const router = new KoaRouter({ prefix: "/api/v1" });

const customReportRouter = require("./customReport.router");

// store all routes
const ROUTERS = [customReportRouter];

ROUTERS.forEach((route) => {
  router.use(route.routes()).use(route.allowedMethods());
});

module.exports = router;
