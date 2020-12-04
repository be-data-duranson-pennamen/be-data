const { Router } = require("express");

const { passenger } = require.main.require("./resources");

module.exports = new Router()

  .get("/", (req, res, next) => {
    passenger
      .readAll()
      .then((found) => res.json(found))
      .catch(next);
  })
  .post("/find", (req, res, next) => {
    passenger
      .findOne(req)
      .then((found) => res.json(found))
      .catch(next);
  })
  .post("/create", (req, res, next) => {
    passenger
      .createOne(req)
      .then(createdOne => res.json(createdOne))
      .catch(next);
  });
