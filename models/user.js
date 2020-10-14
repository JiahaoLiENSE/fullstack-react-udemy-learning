const mongoose = require('mongoose');
/* 
    mongoose-unique-validator is a plugin which adds pre-save validation for unique fields within a Mongoose schema.
    when you try to save a user, the unique validator will check for duplicate database entries and report them just like any other validation error.
    https://www.npmjs.com/package/mongoose-unique-validator
*/
const unqiueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, required: true },
    places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }], // ObjectId: get place string of id. ref: reference from mongoDB database name "Place".
});

// email unqiue validator makes query email as fast as possible
userSchema.plugin(unqiueValidator);

module.exports = mongoose.model('User', userSchema);