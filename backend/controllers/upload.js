const cloudinary = require('cloudinary')
const model = require('../models/upload')

function addImage(req, res ,next){
    return upload(req.files.image.path)
        .then(url => {
            return model.addImage(url, req.params.id)
                .then(response => {
                    res.status(200).send(response)
                })
                .catch(next)
        })
}

function upload(image){
    return new Promise(
        function(resolve){
            cloudinary.v2.uploader.upload(image, {
                eager:[
                    {width:200, height:200, crop: 'fit', gravity: 'face', format:'jpg'}
                ]},
            function(error, result) {
                resolve(result.url)
            })
        })
}

module.exports = {addImage}