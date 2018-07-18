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
            model: 'Single-Cut Bass',
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
                },
                neck: {
                    wood: 'rosewood',
                    scaleLengthInches: 30,
                    frets: {
                        count: 24
                    }
                }
            }
        };
    });
});