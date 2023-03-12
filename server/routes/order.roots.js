const Router = require('express')
const Product = require('../models/Product')
const Order = require('../models/order')
const {check,validationResult} =require('express-validator')
const User = require("../models/User")
const fileService = require('../services/fileService')
const fileController = require('../controllers/fileController')
const authMiddleware = require("../middleware/auth.middleware");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = new Router()

router.post('/upload', fileController.uploadFile)
router.post('/createOrder',
    [
        //check('name','Uncorrect name').isLength({min:3,max:100}),
        //check('type','Uncorrect type').isLength({min:3,max:100}),
        //check('mark','Uncorrect mark').isLength({min:3,max:100}),
        //check('price','Uncorrect price').isFloat,
    ],
    async (req,res)=>{
        try {

            const {adress, fio, phone, type, mark, timeInUse, comment, urgency, time, imgs} =req.body
            console.log(adress, fio, phone, type, mark, timeInUse, comment, urgency, time, imgs)
            const order = new Order({adress, phone, fio, type, mark, timeInUse, comment, urgency, time, imgs})
            await order.save()
            return res.json({order})
        }catch (e){
            console.log(e)
            console.log("aeaeazzz")
        }
    })
router.post('/redactOrder',
    [
        //check('name','Uncorrect name').isLength({min:3,max:100}),
        //check('type','Uncorrect type').isLength({min:3,max:100}),
        //check('mark','Uncorrect mark').isLength({min:3,max:100}),
        //check('price','Uncorrect price').isFloat,
    ],
    async (req,res)=>{
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:'Uncorrect request', errors})
            }
            console.log(req.body.imgs)
            console.log(req.body)
            const newOrder = await Order.updateOne({_id: req.body.id},{$set:{adress:req.body.adress, fio:req.body.fio, phone:req.body.phone, type:req.body.type, mark:req.body.mark, timeInUse:req.body.timeInUse, comment:req.body.comment, urgency:req.body.urgency, time:req.body.time, imgs:req.body.imgs}})
            console.log(newOrder)
            return res.json({message:"Product was redacted"})
        }catch (e){
            console.log(e)
        }
    })

const ItemsPerPage=12
router.get('/getOrders',
    async (req, res) => {
        const page=req.query.currentPage || 1
        console.log('-------------------------------------------------')
        console.log(req.query)
        try {

            const count = await Order.find().count()
            const pageCount = Math.ceil(count / ItemsPerPage)

            let skip;
            console.log(pageCount,page)
            if(req.query.revers==='true')
            {skip =(pageCount-page) * ItemsPerPage}
            else
            {skip =(page-1) * ItemsPerPage}
            let products = await Order.find().limit(ItemsPerPage).skip(skip)

            return res.json({pagination:{count,pageCount},products})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    })
router.post('/getOrder',
    async (req, res) => {
        try {
            console.log(req.body.orderId);
            const order = await Order.findOne({_id:req.body.orderId})
            return res.json({order})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    })
router.post('/deleteOrder',
    async (req, res) => {
        try {
            console.log('------------------------------');
            console.log(req.body.UID);
            const product = await Product.findOneAndDelete({_id:req.body.UID})
            return res.json({product})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    })

module.exports = router