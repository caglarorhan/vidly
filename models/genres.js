const mongoose = require('mongoose');
const Joi = require('joi');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name : {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));


function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).max(50).required()
    };

    return Joi.validate(genre, schema);
}





//module.exports.Customer = Customer // or shorter way below
exports.Genre = Genre
exports.validate = validateGenre;











exports.Genre = Genre
