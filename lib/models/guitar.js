const mongoose = require('mongoose');
const { Schema } = mongoose;

const requiredString = {
    type: String,
    required: true
};

const pickupSchema = {
    type: String,
    lowercase: true,
    enum: ['humbucker', 'p90', 'single-coil', 'other']
};

const controlSchema = {
    controlType: {
        type: String,
        enum: ['knob', '2-way-switch', '3-way-switch', '5-way-switch', 'slider', 'button', 'other']
    },
    count: Number
};

const schema = new Schema({
    make: requiredString,
    model: requiredString,
    description: {
        type: String,
        maxLength: 5000
    },
    isAcoustic: Boolean,
    isBass: Boolean,
    year: Number,
    body: {
        finish: String,
        offset: Boolean,
        bridge: {
            style: String,
            hasTremolo: Boolean
        },
        controls: {
            volume: controlSchema,
            tone: controlSchema
        }
    },
    neck: {
        wood: String,
        scaleLengthInches: Number,
        frets: {
            count: Number,
            slanted: Boolean,
            scalloped: Boolean,
            inlayMarking: String
        }
    },
    pickups: {
        neck: pickupSchema,
        middle: pickupSchema,
        bridge: pickupSchema
    },
    stringCount: {
        type: Number,
        min: 4,
        max: 12
    }
});

module.exports = mongoose.model('Guitar', schema);