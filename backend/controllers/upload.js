const fs = require('fs-extra')
const axios = require('axios')
const cloudinary = require('cloudinary')
const model = require('../models/upload')

function addImage(req, res ,next){
  console.log('hitting addImage, Controller')
  return upload(req.files.image.path)
    .then(url => {
      console.log('url after promise', url)
      return model.addImage(url, req.params.id)
        .then(response => {
          console.log(response)
          res.status(200).send(response)
        })
        .catch(err =>
          console.log('ERROR::::::::::::::::::::::::;', err))
    })
}


function upload(image){
  return new Promise(
    function(resolve, reject){
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