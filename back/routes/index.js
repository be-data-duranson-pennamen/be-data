const { Router } = require("express");

module.exports = new Router()

    .use((err, req, res, next) => {
        res.status(500).json(err.message);
    });