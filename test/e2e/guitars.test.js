const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Guitars API', () => {
    
    beforeEach(() => dropCollection('guitars'));

    let guitar;

    beforeEach(() => {
        const data = {
            make: 'Fender',
            model: 'Jazzmaster'
        };

        return request
            .post('/api/guitars')
            .send(data)
            .then(({ body }) => guitar = body);
    });

    it('saves a guitar', () => {
        assert.isOk(guitar._id);
    });

    it('gets all guitars', () => {
        return request.get('/api/guitars')
            .then(res => res.body)
            .then(guitars => {
                assert.deepEqual(guitars.length, 1);
            });
    });

    it('gets a guitar', () => {
        return request.get(`/api/guitars/${guitar._id}`)
            .then(res => res.body)
            .then(_guitar => {
                assert.equal(guitar.make, _guitar.make);
                assert.equal(guitar.model, _guitar.model);
            });
    });

    it('updates a guitar', () => {
        guitar.stringCount = 6;
        return request.put(`/api/guitars/${guitar._id}`)
            .send(guitar)
            .then(res => res = res.body)
            .then(updated => {
                assert.equal(updated.stringCount, guitar.stringCount);
            });
    });

    it('deletes a guitar', () => {
        return request.delete(`/api/guitars/${guitar._id}`)
            .then(res => res.body)
            .then(result => {
                assert.isTrue(result.removed);
            });
    });

    it.skip('returns false if deleting a nonexistent guitar', () => {
        return request.delete('/api/guitars/583d03a33b6393b3bdfd33106f1')
            .then(res => res.body)
            .then(result => {
                assert.isFalse(result.removed);
            });
    });
});