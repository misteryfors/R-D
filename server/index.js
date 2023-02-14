const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const fileUpload = require("express-fileupload")
const authRouter = require("./routes/auth.roots")
const prodRouter = require("./routes/product.roots")
const chatRouter = require("./routes/chat.roots")
const orderRouter = require("./routes/order.roots")
const app = express()
const PORT = config.get('serverPort')
const corsMiddleware = require('./middleware/cors.middleware')

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json(express.json()))
app.use(express.static('imgs'))
app.use("/api/auth",authRouter)
app.use("/api/prod",prodRouter)
app.use("/api/order",orderRouter)
app.use("/api/chat",chatRouter)

const start = async () => {
    try{
        await mongoose.set('strictQuery', true);
        await mongoose.connect(config.get('URL'))

        app.listen(PORT, () => {
            console.log('Server start on Port ',PORT);
        })
    } catch (e){
        return e
    }
}
start()