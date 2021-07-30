'use strict'

const moment = require('moment')
const mongoose = require('mongoose')
const Usuario_Schema = mongoose.model('Usuario_Schema')
const jwt = require('./token')

function basicLogin(req, res, next) {
    if (!req.body.username || !req.body.password) return res.status(400).send({
        StatusCode: 400,
        Data: {},
        Message: `You need username and password`,
        Results: 0
    })
    Usuario_Schema.find({username: req.body.username}).exec((error, usersSchema) => {
        if (error) return res.status(500).send({StatusCode: 500, Data: {}, Message: error, Results: 0})
        else if (!usersSchema.length) return res.status(404).send({
            StatusCode: 404,
            Data: {},
            Message: `User not found`,
            Results: 0
        })
        else {
            if (usersSchema.length == 1) {
                let user = usersSchema.pop()
                let password = jwt.returnToken(user.password) // return false || {_id, password, tokenCreated}
                if (user._id == password._id && password.password == req.body.password.toString()) {
                    req.userComplete = user
                    return res.status(200).send({
                        StatusCode: 200,
                        Data: {user, token: jwt.tokenUser(user)},
                        Message: `Operation Successful`,
                        Results: 1
                    })
                } else if (user._id != password._id) return res.status(401).send({
                    StatusCode: 401,
                    Data: {},
                    Message: `this password is not yours`,
                    Results: 0
                })
                else return res.status(500).send({
                        StatusCode: 500,
                        Data: {},
                        Message: `Not matching in password and certificate`,
                        Results: 0
                    })
            } else {
                return res.status(500).send({
                    StatusCode: 500,
                    Data: usersSchema,
                    Message: `Multiples Users`,
                    Results: usersSchema.length
                })
            }
        }
    })
}

function validateWithToken(req, res, next) {
    if (req.headers.token || typeof req.headers.token == 'string') {
        var dataToken = jwt.returnToken(req.headers.token)
        var expired = false
        if (!dataToken || typeof dataToken == 'undefined' || !dataToken._id) return res.status(401).send({
            StatusCode: 401,
            Data: {},
            Message: `This token is invalid`,
            Results: 0
        })
        expired = jwt.verifyExpiredToken(req.headers.token)
        if (expired == 'expired' || expired == 'invalid') return res.status(401).send({
            StatusCode: 401,
            Data: {},
            Message: `Token expired`,
            Results: 0
        })
        if (expired != 'not expired') res.setHeader('token', expired) && res.set({'newtoken': expired})
        Usuario_Schema.findOne({_id: dataToken._id}).exec((errorfinding, user) => {
            if (errorfinding) return res.status(500).send({
                StatusCode: 500,
                Data: {},
                Message: errorfinding,
                Results: 0
            })
            else if (!user) return res.status(404).send({
                StatusCode: 404,
                Data: {},
                Message: `User not founded`,
                Results: 0
            })
            else {
                req.userComplete = user
                next()
            }
        })
    } else return res.status(400).send({
        StatusCode: 400,
        Data: {},
        Message: `Required in headers the key token valid`,
        Results: 0
    })
}

function validateWithouteToken(req, res, next) {
    if (req.headers.token || typeof req.headers.token == 'string') {
        var dataToken = jwt.returnToken(req.headers.token)
        var expired = false
        if (!dataToken || typeof dataToken == 'undefined' || !dataToken._id) {
            req.userComplete = false
            next()
        }
        expired = jwt.verifyExpiredToken(req.headers.token)
        if (expired == 'expired' || expired == 'invalid') {
            req.userComplete = false
            next()
        }
        if (expired != 'not expired') res.setHeader('token', expired) && res.set({'newtoken': expired})
        Usuario_Schema.findOne({_id: dataToken._id}).exec((errorfinding, user) => {
            if (errorfinding) {
                req.userComplete = false
                next()
            } else {
                req.userComplete = user || false
                next()
            }
        })
    } else {
        req.userComplete = false
        next()
    }
}

module.exports = {
    basicLogin,
    validateWithToken,
    validateWithouteToken
}
