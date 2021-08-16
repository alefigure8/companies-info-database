const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    email: { type: String },
    password: { type: String }
});

//Cifrat
userSchema.methods.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
};

//Match
userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('users', userSchema);