const {Schema, model} = require("mongoose")


const Order = new Schema({
    adress:{type: String, required:true},
    fio:{type: String, required:true},
    phone:{type:String, required:true},
    type:{type: String, required:true},
    mark:{type: String, required:true},
    timeInUse:{type: Number, required:true},
    comment:{type: String, required:true},
    urgency:{type: Boolean, required:true},
    time:{type: Date, required:true},
    imgs:[{type: String }]
})

module.exports = model('Order', Order)