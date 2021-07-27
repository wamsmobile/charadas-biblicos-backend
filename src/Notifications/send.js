'use strict'

const firebase = require('firebase-admin')
const Mongoose = require ('mongoose')
const Dispositives_Schema = Mongoose.model('Dispositives_Schema')

function sendNotfication (req, res) {
  if (!req.userComplete) return res.status(401).send({StatusCode: 401, Data: {}, Message: `Required Login`, Results: 0})
  if (!req.body.message || !req.body.value) return res.status(400).send({StatusCode: 400, Data: {}, Message: `Required message and value in body`, Results: 0})
  Dispositives_Schema.find({notifications: true}).exec((err, dispositives) => {
    if (err) return res.status(500).send({StatusCode: 500, Data: {}, Message: err, Results: 0})
    else {
      var registrationToken = dispositives.map(phone => {
        return phone.FCI
      })
      if (!registrationToken.length) registrationToken.push('fwxmTyDRN5k:APA91bGlJ3n8gkLHg46scTfjyhkhuWcNfN4zA2YLtaGc6S_jagBvaf6DvhwmCRPic-0eywPJIZ39BY2ABe5X2cdRLlnVCMoqOJ0ZasO8uUiGkqxyYIXnrGiY2AuUl660YPQ3evqxB4bn')
      var payload = {
        notification: {
          title: 'Charadas Max',
          body: req.body.message
        },
        data: {
          _id: req.body.value
        }
      }
      // Set the message as high priority and have it expire after 24 hours.
      var options = {
        priority: 'normal',
        timeToLive: 60 * 60 * 24
      }
      try {
        firebase.messaging().sendToDevice(registrationToken, payload, options)
        .then(ok => {
          return res.status(200).send({StatusCode: 200, Data: ok, Message: `Dry run successful`, Results: 1})
        })
        .catch(err => {
          return res.status(500).send({StatusCode: 500, Data: {}, Message: err, Results: 0})
        })
      } catch (error) {
        return res.status(500).send({StatusCode: 500, Data: {}, Message: error.message || error, Results: 0})
      }
    }
  })
}

module.exports = {
  sendNotfication
}
