const {Schema, model, ObjectId} = require("mongoose")


const User = new Schema({
    email:{type: String, required:true, unique:true},
    password:{type: String, required:true},
    role:{type: String, required:true},
    phone:{type: String},
    name:{type: String},
    orders:[{type: ObjectId, ref:'Order'}],
    shoppingСart:[{type: ObjectId, ref:'Product'}],
})

module.exports = model('User', User)