const router = require('express').Router();
const Guitar = require('../models/guitar');

module.exports = router
    .get('/', (req, res) => {
        Guitar.find(req.query)
            .lean()
            .then(guitars => res.json(guitars));
    })

    .get('/:id', (req, res) => {
        Guitar.findById(req.query)
            .lean()
            .then(guitar => res.json(guitar));
    })

    .post('/', (req, res) => {
        Guitar.create(req.body)
            .then(guitar => res.json(guitar));
    })

    .put('/:id', (req, res) => {
        Guitar.findByIdAndUpdate(req.body)
            .then(guitar => res.json(guitar));
    })

    .delete('/:id', (req, res) => {
        Guitar.findByIdAndRemove(req.body)
            .then(guitar => res.json(guitar));
    });