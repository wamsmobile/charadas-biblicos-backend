'use strict'

const moment = require ('moment')
const mongoose = require ('mongoose')
const Usuario_Schema = mongoose.model('Usuario_Schema')
const jwt = require ('./../middleware/token')

function newUser (req, res) {
  if (!req.body.username || !req.body.password) return res.status(400).send({StausCode: 400, Data: {}, Messagge: `Required username and password`, Results: 0})
  const newUser = new Usuario_Schema ({
    username: req.body.username || null,
    password: req.body.password || null
  })
  newUser.password = jwt.tokenPassword(newUser)
  newUser.save()
  .then(usersaved => {
    return res.status(200).send({StausCode: 200, Data: {user: usersaved, token: jwt.tokenUser(newUser)}, Messagge: `User Saved Correctly`, Results: 1})
  })
  .catch(error => {
    return res.status(500).send({StausCode: 500, Data: {}, Messagge: error, Results: 0})
  })  
}

module.exports = {
  newUser
}
