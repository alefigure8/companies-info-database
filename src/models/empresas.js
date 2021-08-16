const mongoose = require('mongoose');
const { options } = require('../routes/form');
const { Schema } = mongoose;

const corpSchema = new Schema({
    name: { type: String, default: 'off' },
    cuit: { type: String, default: 'off' },
    url: { type: String, default: 'off' },
    construar: { type: String, default: 'off' },
    construar_note: { type: String, default: 'off' },
    op_suscript: { type: String, default: 'off' },
    op_exsuscript: { type: String, default: 'off' },
    send_mail: { type: String, default: 'off' },
    call: { type: String, default: 'off' },
}, {
    timestamps: true
});

module.exports = mongoose.model('empresa', corpSchema)

//{ type: Boolean, required: true, default: false },