'use strict'

const multer = require ('multer')
const path = require ('path')
const mongoose = require('mongoose')
const moment = require ('moment')

const opcionMulter = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../../static'))
  },
  filename: (req, file, callback) => {
    callback(null, `${moment().format('D-MM-YYYY-H-mm-ss')}-${mongoose.Types.ObjectId().toString()}.${file.originalname.split('.').pop().toString()}`)
  }
})

const middlewareMultimedia = multer({storage: opcionMulter})

module.exports = {
  opcionMulter,
  middlewareMultimedia
}
