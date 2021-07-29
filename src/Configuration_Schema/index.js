'use strict'

const mongoose = require('mongoose')
const Config_Schema = mongoose.model('Config_Schema')

function getConfig(req, res) {
    if (!req.userComplete) return res.status(401).send({
        StatusCode: 401,
        Data: {},
        Message: `Required Login`,
        Results: 0
    })
    Config_Schema.findOne({}).exec((error, response) => {
        if (error) return res.status(500).send({StatusCode: 500, Data: {}, Message: error, Results: 0})
        else {
            return res.status(200).send({StatusCode: 200, Data: response, Message: `Operation Successful`, Results: 1})
        }
    })
}

function createConfig(req, res) {
    var config = new Config_Schema({
        languagues: req.body.languagues || ['Español', 'English']
    })
    config.save()
        .then(ok => {
            return res.status(200).send({StatusCode: 200, Data: ok, Message: `Ok`, Results: 1})
        })
        .catch(error => {
            return res.status(500).send({StatusCode: 500, Data: {}, Message: error, Results: 0})
        })
}

function updateConfig(req, res) {
    if (!req.userComplete) return res.status(401).send({
        StatusCode: 401,
        Data: {},
        Message: `Required Login`,
        Results: 0
    })
    if (!req.body._id) return res.status(400).send({
        StatusCode: 400,
        Data: {},
        Message: `Required _id in body`,
        Results: 0
    })
    Config_Schema.findOneAndUpdate({_id: req.body._id}, req.body).exec((error, response) => {
        if (error) return res.status(500).send({StatusCode: 500, Data: {}, Message: error, Results: 0})
        else {
            return res.status(200).send({StatusCode: 200, Data: response, Message: `Operation Successful`, Results: 1})
        }
    })
}

module.exports = {
    getConfig,
    updateConfig,
    createConfig
}
