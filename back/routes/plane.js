const { Router } = require("express");

const { plane } = require.main.require("./resources");

module.exports = new Router()

    .get("/", (req, res, next) => {
        plane
            .readAll()
            .then(found => res.json(found))
            .catch(next);
    })
    .post("/find", (req, res, next) => {
        plane
            .findOne(req)
            .then(found => res.json(found))
            .catch(next);
    })
    .post("/create", (req, res, next) => {
        plane
            .createOne(req)
            .then(() => res.json())
            .catch(next);
    })
    .delete("/", (req, res, next) => {
        plane
            .deleteOne(req)
            .then(() => res.json())
            .catch(next);
    })