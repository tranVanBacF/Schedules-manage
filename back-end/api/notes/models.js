const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({

    content: String,
    done: {
        type: Boolean,
        default: false,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }

})

const NoteModel = mongoose.model('Note',NoteSchema);

module.exports = NoteModel;