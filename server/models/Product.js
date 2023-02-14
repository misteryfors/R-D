const {Schema, model} = require("mongoose")


const Product = new Schema({
    name:{type: String },
    type:{type: String },
    mark:{type: String },
    price:{type: Number },
    shortDescription:{type: String },
    description:{type: String },
    imgs:[{type: String }],
    publicate:{type:Boolean }
})

module.exports = model('Product', Product)