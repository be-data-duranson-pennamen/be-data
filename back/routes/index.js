const { Router } = require("express");

module.exports = new Router()

  .use("/employee", require("./employee"))
  .use("/flight", require("./flight"))
  .use("/passenger", require("./passenger"))
  .use("/plane", require("./plane"))
  .use("/ticket", require("./ticket"))
  .use("/generate", require("./generation"))
  .use("/delete", require("./delete"))
  .use((err, req, res, next) => {
    console.log(err)
    res.status(500).json(err);
  });
