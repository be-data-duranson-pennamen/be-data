const { Router } = require("express");

const { ticket } = require.main.require("./resources");

module.exports = new Router()

    .get("/", (req, res, next) => {
        ticket
            .readAll()
            .then(found => res.json(found))
            .catch(next);
    })
    .post("/find", (req, res, next) => {
        ticket
            .findOne(req)
            .then(found => res.json(found))
            .catch(next);
    })
    .post("/create", (req, res, next) => {
        ticket
            .createOne(req)
            .then(() => res.json())
            .catch(next);
    })
