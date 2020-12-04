const { Router } = require("express");

const { employee, passenger, flight, plane, ticket } = require.main.require(
  "./resources"
);

module.exports = new Router()
  .post("/employee", (req, res, next) => {
    employee
      .deleteOne(req)
      .then(() => res.send("Supprimé"))
      .catch(next);
  })
  .post("/plane", (req, res, next) => {
    plane
      .deleteOne(req)
      .then(() => res.send("Supprimé"))
      .catch(next);
  })
  .post("/passenger", (req, res, next) => {
    passenger
      .deleteOne(req)
      .then(() => res.send("Supprimé"))
      .catch(next);
  })
  .post("/flight", (req, res, next) => {
    flight
      .deleteOne(req)
      .then(() => res.send("Supprimé"))
      .catch(next);
  })
  .post("/ticket", (req, res, next) => {
    ticket
      .deleteOne(req)
      .then(() => res.send("Supprimé"))
      .catch(next);
  })
  .get("/all", (req, res, next) => {
    ticket
      .deleteAll()
      .then(() => {})
      .catch(next);
    flight
      .deleteAll()
      .then(() => {})
      .catch(next);
    plane
      .deleteAll()
      .then(() => {})
      .catch(next);
    passenger
      .deleteAll()
      .then(() => {})
      .catch(next);
    employee
      .deleteAll()
      .then(() => {})
      .catch(next);
  });
