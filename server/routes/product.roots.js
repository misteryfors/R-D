const Router = require('express')
const Product = require('../models/Product')
const {check,validationResult} =require('express-validator')
const User = require("../models/User")
const fileService = require('../services/fileService')
const fileController = require('../controllers/fileController')
const authMiddleware = require("../middleware/auth.middleware");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = new Router()

router.post('/upload', fileController.uploadFile)
router.post('/createProduct',
    [
        //check('name','Uncorrect name').isLength({min:3,max:100}),
        //check('type','Uncorrect type').isLength({min:3,max:100}),
        //check('mark','Uncorrect mark').isLength({min:3,max:100}),
        //check('price','Uncorrect price').isFloat,
    ],
    async (req,res)=>{
        try {
            console.log("aeaea")
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:'Uncorrect request', errors})
            }
            //console.log(req.body)
            const {name, type, mark, price, shortDescription, description, images} =req.body
            const newProd = await Product.findOne({name})
            if (newProd)
            {
                return res.status(400).json({message: 'Product with name '+name+' already exist'})
            }
            const product = new Product({name, type, mark, price, shortDescription, description, images})
            await product.save()
            await fileService.createDir("products/"+product.id)

            return res.json({product})
        }catch (e){
            console.log(e)
            console.log("aeaeazzz")
        }
    })
router.post('/redactProduct',
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
            const newProd = await Product.updateOne({_id: req.body.UID},{$set:{name:req.body.name, type:req.body.type, mark:req.body.mark, price:req.body.price, shortDescription:req.body.shortDescription, description:req.body.description, imgs:req.body.imgs}})
            console.log(newProd)
            return res.json({message:"Product was redacted"})
        }catch (e){
            console.log(e)
        }
    })
const ItemsPerPage=12
router.post('/getProducts',
    async (req, res) => {
        const page=req.body.currentPage || 1
        console.log('-------------------------------------------------')
        console.log(req.body.filters)
        const minPrice=req.body.filters.minPrice || 0
        const maxPrice=req.body.filters.maxPrice || 99999999999
        const priceFilter={$gte:minPrice,$lte:maxPrice}
        console.log(minPrice,maxPrice)
        const query={ $and: [{price:priceFilter,name:{$regex:req.body.filters.name,$options:"$i"},type:{$regex:req.body.filters.type,$options:"$i"},mark:{$regex:req.body.filters.mark,$options:"$i"}},{$or:[{name:{$regex:req.body.filters.all,$options:"$i"}},{type:{$regex:req.body.filters.all,$options:"$i"}},{mark:{$regex:req.body.filters.all,$options:"$i"}}]}]}
        try {
                const skip =(page-1) * ItemsPerPage
                const products = await Product.find(query).limit(ItemsPerPage).skip(skip)
                const count = await Product.find(query).count()
                const pageCount = Math.ceil(count / ItemsPerPage)
            return res.json({pagination:{count,pageCount},products})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    })
router.post('/getProduct',
    async (req, res) => {
        try {
            console.log(req.body.UID);
            const product = await Product.findOne({_id:req.body.UID})
            return res.json({product})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    })
router.post('/deleteProduct',
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