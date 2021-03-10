const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,
        required: [true, 'E-mail nao informado!'],
        unique: 'Esse e-mail ja esta em uso!'
    },
    username:{
        type: String,
        minLength: 3,
        maxLength: 20,
        required: [true, 'Usuario nao informado!'],
        unique: 'Esse usuario ja esta em uso!'
    },
    password:{
        type: String,
        required: true,
    }
}, { timestamps: true});

userSchema.plugin(require('mongoose-beautiful-unique-validation'));

const User = mongoose.model('User', userSchema);

module.exports = User;
