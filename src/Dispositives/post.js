'use strict'

const mongoose = require ('mongoose')
const Dispositives_Schema = mongoose.model('Dispositives_Schema')

function createOrUpdate (req, res) {
  if (!req.body.dispositive || !req.body.FCI) return res.status(400).send({StatusCode: 400, Data: {}, Message: `Required dispositive and FCI in body`, Results: 0})
  Dispositives_Schema.findOne({dispositive: req.body.dispositive}).exec((error, response) => {
    if (error) return res.status(500).send({StatusCode: 500, Data: {}, Message: error, Results: 0})
    else if (!response) {
      const phone = new Dispositives_Schema ({
        dispositive: req.body.dispositive,
        FCI: req.body.FCI,
        notifications: true
      }, { timestamps: { createdAt: 'created' }})
      .then(ok => {
        return res.status(200).send({StatusCode: 200, Data: phone, Message: `Operation Successfull`, Results: 1})
      })
      .catch(errorr => {
        return res.status(500).send({StatusCode: 500, Data: {}, Message: errorr, Results: 0})
      })
    } else {
      response.dispositive = req.body.dispositive
      response.FCI = req.body.FCI
      response.save()
      .then(ok => {
        return res.status(200).send({StatusCode: 200, Data: response, Message: `Operation Successfull`, Results: 1})
      })
      .catch(errorr => {
        return res.status(500).send({StatusCode: 500, Data: {}, Message: errorr, Results: 0})
      })
    }
  })
}

module.exports = {
  createOrUpdate
}
