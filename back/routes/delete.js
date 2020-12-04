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
      .then(() =>
        flight
          .deleteAll()
          .then(() =>
            plane
              .deleteAll()
              .then(() =>
                passenger
                  .deleteAll()
                  .then(() =>
                    employee
                      .deleteAll()
                      .then(() => res.send("Supprimé"))
                      .catch(next)
                  )
                  .catch(next)
              )
              .catch(next)
          )
          .catch(next)
      )
      .catch(next);
  });
