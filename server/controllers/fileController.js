const fileService = require('../services/fileService')
const config = require('config')
const fs = require('fs')
const Product = require('../models/Product')
const {json} = require("express");


class FileController {
    async uploadFile(req, res) {
        try {
            const file = req.files.file

            const {UID,DIR} = await req.body
            console.log(DIR)
            let path = `${config.get('filePath')+'/'+DIR}\\${UID}`
            if (!fs.existsSync(path)) {
                await fileService.createDir(UID)
            }
            path = `${path}\\${file.name}`
            file.mv(path)

            res.json("ok")
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Upload error"})
        }
    }
}

module.exports = new FileController()