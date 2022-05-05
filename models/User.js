const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema({
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
        match: [/.+@.+\..+/, 'Please enter a valid e-mail.']
    },
    thoughts: [ ],
    friends: [ this ]
   },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    
    }
);

//Create friendCount Virtual
UserSchema.virtual('friendCount').get(function ( ) {
    return this.friends.length;
});

//Creating User with UserSchema
const User = model('User', UserSchema);

module.exports = User;