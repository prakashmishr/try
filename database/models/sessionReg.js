const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    SpeakerName: {
        type: String,
        required: true
    },
    SpeakerEmail: {
        type: String,
        required: true
    },
    SessionDate: {
        type: Date,
        required: true
    },
    SessionTime: {
        type: String,
        required: true
    },

    HallNo: {
        type: String,
        required: true
    },
    SessionTitle: {
        type: String,
        required: true
    },
    SessionDesc: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

const SessionModel = mongoose.model('Session', SessionSchema);

module.exports = SessionModel;