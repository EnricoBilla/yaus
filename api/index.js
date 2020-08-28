const express = require('express');
const bodyParser = require('body-parser');
const monk = require('monk');
const yup = require('yup');

const api = express();

// const mongo_url = 'localhost:27017/yaus'; //TODO env variables
// const db = monk(mongo_url);

const schema = yup.object().shape({
    id: yup.string().matches(/^[\w\-]+$/),
    redirect: yup.string().url().required(),
});

// db.then(() => {
//   console.log('Connected correctly to server')
// })

api.use(express.json());
api.use(bodyParser.json());

api.get('/urls/:id', (req, res) => {
    const { id } = req.params;

    // TODO give info about redirect to id
    res.json({
        id: id,
        redirect: "https://google.com",
        clicks: 17,
        message: "here you go",
    });
});

api.post('/urls', async (req, res) => {
    // TODO create new redirect url

    var { id, redirect } = req.body;

    console.log({
        id,
        redirect,
    })

    try {
        await schema.validate({
            id,
            redirect,
        });
    } catch (error) {
        return res.json({
            status: 500,
        });
    }

    res.json({
        id: id,
        redirect: redirect,
        message: "created new redirect",
    });

});

module.exports = api;