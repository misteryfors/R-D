const fs = require('fs')
const config = require('config')

class FileService {

    createDir(name) {
        const filePath = `${config.get('filePath')}\\${name}`
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({message: 'File was created'})
                } else {
                    return reject({message: "File already exist"})
                }
            } catch (e) {
                console.log(e)
                return reject({message: 'File error'})
            }
        }))
    }

}


module.exports = new FileService()