const { Router } = require("express");

const { flight } = require.main.require("./resources");

module.exports = new Router()

    .get("/", (req, res, next) => {
        flight
            .readAll()
            .then(found => res.json(found))
            .catch(next);
    })
    .post("/find", (req, res, next) => {
        flight
            .findOne(req)
            .then(found => res.json(found))
            .catch(next);
    })
    .post("/createMany", (req, res, next) => {
        flight
            .createMany(req)
            .then(() => res.json())
            .catch(next);
    })
    .post("/create", (req, res, next) => {
        flight
            .createOne(req)
            .then(() => res.json())
            .catch(next);
    })
    .get("/airports", (req, res, next) => {
        res.json(flight.getAllAvailableAirports())
    })