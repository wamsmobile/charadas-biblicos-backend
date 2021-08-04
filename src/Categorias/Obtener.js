'use strict'

const Mongoose = require('mongoose')
const {forEach} = require("mongoose/lib/statemachine");
const Categoria_Schema = Mongoose.model('Categoria_Schema')

function id(req, res) {
    if (!req.params.ID) {
        return res.status(400).send({StatusCode: 400, Data: {}, Message: 'Faltan Campos', Results: 0})
    }
    Categoria_Schema.findOne({_id: req.params.ID}).exec((error, respuesta) => {
        if (error) {
            return res.status(500).send({StatusCode: 500, Data: {}, Message: error, Results: 0})
        } else if (!respuesta) {
            return res.status(404).send({StatusCode: 404, Data: {}, Message: 'Not Found', Results: 0})
        } else if (respuesta) {
            return res.status(200).send({
                StatusCode: 200,
                Data: respuesta,
                Message: 'Operation Successful',
                Results: 1
            })
        }
    })
}

function all(req, res) {
    Categoria_Schema.find({}).exec((error, respuesta) => {
        if (error) {
            return res.status(500).send({StatusCode: 500, Data: {}, Message: error, Results: 0})
        } else {
            respuesta = JSON.parse(respuesta)
            for (let i in respuesta) {

            }
            return res.status(200).send({StatusCode: 200, Data: respuesta, Message: 'Operation Successful', Results: 1})
        }
    })
}

module.exports = {
    id,
    all
}
