const express = require('express');
const bodyParser = require('body-parser');
const monk = require('monk');
const yup = require('yup');
const { nanoid } = require('nanoid');

const api = express();

const MONGO_URL = process.env.MONGO_URL;
const db = monk(MONGO_URL);
const urls = db.get('urls');
urls.createIndex({ id: 1 }, { unique: true });

const schema = yup.object().shape({
    id: yup.string().matches(/^[\w\-]*$/).nullable(),
    redirect: yup.string().matches(/^(https?:\/\/)((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i).required(),
});

api.use(express.json());
api.use(bodyParser.json());

api.get('/urls/:id', async (req, res) => {

    const { id } = req.params;

    await urls.findOne({id: id})
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.json({
                status: 500,
                errors: process.env.NODE_ENV === 'dev' ? error : '🦄',
            });
        });
});

api.post('/urls', async (req, res) => {

    const { id, redirect } = req.body;

    await schema.validate({
            id,
            redirect,
        }).then(async (value) => {
            if (!value.id) {
                value.id = nanoid(6); // possible collision?
            }
            console.log(value);
            const created = await urls.insert(Object.assign(value, {clicks:0}));
            res.json(Object.assign(created, {status:200}));
        }).catch(error => {
            res.json({
                status: 500,
                errors: process.env.NODE_ENV === 'dev' ? error : '🦄',
            });
        });

});

module.exports = { api, urls };