const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: {
        type: String,
        select: false
    },
}, {
    timestamps: true
});

mongoose.model('User', UserSchema);

