const router = require('express').Router();
const Guitar = require('../models/guitar');

module.exports = router
    .get('/', (req, res) => {
        Guitar.find()
            .lean()
            .then(guitars => res.json(guitars));
    })

    .get('/:id', (req, res) => {
        Guitar.findById(req.params.id)
            .lean()
            .then(guitar => {
                if(!guitar) res.status(404).send(`cannot get ${req.params.id}`);
                else res.json(guitar);
            });
    })

    .post('/', (req, res) => {
        Guitar.create(req.body)
            .then(guitar => res.json(guitar));
    })

    .put('/:id', (req, res) => {
        Guitar.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(guitar => res.json(guitar));
    })

    .delete('/:id', (req, res) => {
        Guitar.findByIdAndRemove(req.params.id)
            .then(response => res.send({ removed: !! response }));
    });