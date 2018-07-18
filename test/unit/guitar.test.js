const chai = require('chai');
const { assert } = chai;
const Guitar = require('../../lib/models/guitar');

const getErrors = (validation, numberExpected) => {
    assert.isDefined(validation);
    const errors = validation.errors;
    assert.equal(Object.keys(errors).length, numberExpected);
    return errors;
};

describe('Guitar model', () => {
    it('validates good model', () => {
        const data = {
            make: 'Danelectro',
            model: 'Single Cut Bass',
            description: 'This is a really dang good bass guitar.',
            isAcoustic: false,
            isBass: true,
            year: 1965,
            body: {
                finish: 'Black',
                offset: false,
                bridge: {
                    style: 'Vintage Wooden',
                    hasTremolo: false
                },
                controls: {
                    volume: {
                        controlType: 'knob',
                        count: 2
                    },
                    tone: {
                        controlType: 'knob',
                        count: 1
                    }
                }
            },
            neck: {
                wood: 'rosewood',
                scaleLengthInches: 30,
                frets: {
                    count: 24,
                    slanted: false,
                    scalloped: false,
                    inlayMarking: 'dot'
                }
            },
            pickups: {
                neck: 'lipstick',
                middle: 'none',
                bridge: 'lipstick'
            },
            stringCount: 4
        };

        const guitar = new Guitar(data);

        const json = guitar.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(guitar.validateSync());
    });

    it('validates required fields', () => {
        const guitar = new Guitar({});
        const errors = getErrors(guitar.validateSync(), 2);
        assert.equal(errors.make.kind, 'required');
        assert.equal(errors.model.kind, 'required');
    });

    it('stringCount is at least 4', () => {
        const guitar = new Guitar({
            make: 'Slash',
            model: 'Slash\'s first guitar',
            stringCount: 1
        });

        const errors = getErrors(guitar.validateSync(), 1);
        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors.stringCount.kind, 'min');
    });

    it('stringCount is at most 12', () => {
        const guitar = new Guitar({
            make: 'The guy at Schecter who gets away with too much',
            model: 'Some double-neck djent bull honkey',
            stringCount: 400
        });

        const errors = getErrors(guitar.validateSync(), 1);
        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors.stringCount.kind, 'max');
    });

    it('pickup style enum validates', () => {
        const guitar = new Guitar({
            make: 'Some experimental luthier',
            model: 'the bad-pickup extravaganza',
            pickups: {
                neck: 'very',
                middle: 'weird',
                bridge: 'pickups'
            }
        });

        const errors = getErrors(guitar.validateSync(), 3);
        assert.equal(Object.keys(errors).length, 3);
        assert.equal(errors['pickups.neck'].kind, 'enum');
        assert.equal(errors['pickups.middle'].kind, 'enum');
        assert.equal(errors['pickups.bridge'].kind, 'enum');
    });
});