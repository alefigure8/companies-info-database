const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

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

corpSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('empresa', corpSchema)