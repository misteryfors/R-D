const {Schema, model, ObjectId} = require("mongoose")


const Chat = new Schema({
    firstUser:{type:ObjectId, ref:'User'},
    firstUserName:{type: String},
    secondUser:{type:ObjectId, ref:'User'},
    secondUserName:{type: String}
})

module.exports = model('Chat', Chat)