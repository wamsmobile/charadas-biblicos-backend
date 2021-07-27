'use strict'

const mongoose = require ('mongoose')
const Dispositives_Schema = mongoose.model('Dispositives_Schema')

function getAll (req, res) {
  if (!req.userComplete) return res.status(401).send({StatusCode: 401, Data: {}, Message: `Required Login`, Results: 0})
  Dispositives_Schema.find({}).exec((error, response) => {
    if (error) return res.status(500).send({StatusCode: 500, Data: {}, Message: error, Results: 0})
    else {
      return res.status(200).send({StatusCode: 200, Data: response, Message: `Operation Successful`, Results: 1})
    }
  })
}

module.exports = {
  getAll
}
