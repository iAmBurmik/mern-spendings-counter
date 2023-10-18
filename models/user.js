const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String},
    spends: [{type: Types.ObjectId, ref: 'Cost'}]
})

module.exports = model('User', schema)