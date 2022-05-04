const { Schema, model } = require('mongoose');
const moment = require('moment');

//User 
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

//Create friendCount Virtual
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

//Creating User with UserSchema
const User = model('User', userSchema);

module.exports = User;