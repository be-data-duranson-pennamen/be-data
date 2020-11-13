const { Router } = require("express");

const {generation} = require.main.require("./resources");

module.exports = new Router()

    .get("/", (req, res, next) => {
        generation
            .generateRandom(req)
            .then(() => res.send('Généré avec succès'))
            .catch(next);
    })
