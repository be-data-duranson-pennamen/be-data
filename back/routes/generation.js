const { Router } = require("express");

const generation = require.main.require("./generation");

module.exports = new Router()

    .get("/", (req, res, next) => {
        generation
            .generateAll()
            .then(found => res.json(found))
            .catch(next);
    })
    .get("/employees", (req, res, next) => {
        generation
            .generateEmployees()
            .then(found => res.json(found))
            .catch(next);
    })
