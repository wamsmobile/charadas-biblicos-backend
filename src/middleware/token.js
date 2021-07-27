'use strict'

const jwt = require ('jwt-simple')
const moment = require ('moment')
const config = require ('./../../configuracion')

function tokenUser (user) {
  return jwt.encode({
    _id: user._id,
    tokenCreated: moment().unix(),
    tokenDeprecation: moment().add(8, 'days').unix(),
    tokenDeprecated: moment().add(10, 'days').unix()
  }, config.TOKEN_SECRETO, 'HS512')
}

function tokenPassword (user) {
  return jwt.encode({
    _id: user._id,
    password: user.password,
    tokenCreated: moment().unix()
  }, config.TOKEN_SECRETO, 'HS512')
}

function returnToken (token) {
  try {
    return jwt.decode(token, config.TOKEN_SECRETO)
  } catch (error) {
    console.log(`🔑 ⛏ DANGER, this token is invalid`)
    return false
  }
}

function verifyExpiredToken (token) {
  try {
    var tokenlocal = jwt.decode(token, config.TOKEN_SECRETO)
    if (tokenlocal.tokenDeprecated && moment().unix() >= tokenlocal.tokenDeprecated) return `expired`
    else if (tokenlocal.tokenDeprecation && moment().unix() >= tokenlocal.tokenDeprecation && moment().unix() < tokenlocal.tokenDeprecated) return tokenUser(tokenlocal)
    else return `not expired`
  } catch (error) {
    console.log(`🔑 ⛏ DANGER, this token is invalid`)
    return `invalid`
  }
}

module.exports = {
  tokenUser,
  tokenPassword,
  returnToken,
  verifyExpiredToken
}
