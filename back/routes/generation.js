const { Router } = require("express");

const { employee, passenger, plane, ticket } = require.main.require(
  "./resources"
);

module.exports = new Router()
  .get("/employee", (req, res, next) => {
    if (req && req.query && req.query.num && typeof req.query.num == Number) {
      employee
        .generateRandom(req.query.num)
        .then(() => res.send("Généré avec succès"))
        .catch(next);
    } else {
      employee
        .generateRandom()
        .then(() => res.send("Généré avec succès"))
        .catch(next);
    }
  })
  .get("/plane", (req, res, next) => {
    if (req && req.query && req.query.num && typeof req.query.num == Number) {
      plane
        .generateRandom(req.query.num)
        .then(() => res.send("Généré avec succès"))
        .catch(next);
    } else {
      plane
        .generateRandom()
        .then(() => res.send("Généré avec succès"))
        .catch(next);
    }
  })
  .get("/passenger", (req, res, next) => {
    if (req && req.query && req.query.num && typeof req.query.num == Number) {
      passenger
        .generateRandom(req.query.num)
        .then(() => res.send("Généré avec succès"))
        .catch(next);
    } else {
      passenger
        .generateRandom()
        .then(() => res.send("Généré avec succès"))
        .catch(next);
    }
  })
  // pas opti
  .get("/ticket", (req, res, next) => {
    ticket
      .generateRandom()
      .then(() => res.send("Généré avec succès"))
      .catch(next);
  });
