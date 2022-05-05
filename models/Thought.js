const { Schema, model, Types } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        validate: [({ length }) => length > 0 && length <= 280, 'Thoughts must be between 1 and 280 characters.']
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},

    {
        toJSON: {
            virtuals: true,
            getters: true
        },
     
    }
);


//Create reactionCount Virtual
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;