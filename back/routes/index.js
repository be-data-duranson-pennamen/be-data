const { Router } = require("express");

module.exports = new Router()

  .use("/employee", require("./employee"))
  .use("/flight", require("./flight"))
  .use("/passenger", require("./passenger"))
  .use("/plane", require("./plane"))
  .use("/ticket", require("./ticket"))
  .use("/generate", require("./generation"))
  .use((err, req, res, next) => {
    res.status(500).json(err.message);
  });
