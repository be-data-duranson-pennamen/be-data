const { Router } = require("express");

const { employee } = require.main.require("./resources");

module.exports = new Router()

    .get("/", (req, res, next) => {
        employee
            .readAll()
            .then(found => res.json(found))
            .catch(next);
    })
    .post("/find", (req, res, next) => {
        employee
            .findOne(req)
            .then(found => res.json(found))
            .catch(next);
    })
    .post("/create", (req, res, next) => {
        employee
            .createOne(req)
            .then(() => res.json())
            .catch(next);
    })
