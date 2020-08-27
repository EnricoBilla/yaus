const express = require('express');

const api = express();

api.use(express.json());

api.get('/', (req, res) => {
    res.json({
        message: "api is working",
    });
});

// api.get('/:id', (req, res) => {
//     // TODO give info about redirect to id
// });

module.exports = api;