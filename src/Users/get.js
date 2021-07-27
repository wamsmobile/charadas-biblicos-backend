'use strict'

const mongoose = require ('mongoose')
const Usuario_Schema = mongoose.model('Usuario_Schema')

function getmyuser (req, res) {
  if (!req.userComplete) return res.status(401).send({StatusCode: 401, Data: {}, Message: `Required token valid`, Results: 0})
  else return res.status(200).send({StatusCode: 200, Data: req.userComplete, Message: `Operation Successfull`, Results: 1})
}

module.exports = {
  getmyuser
}
