'use strict'

const Mongoose = require('mongoose')
const Categoria_Schema = Mongoose.model('Categoria_Schema')

function eliminar(req, res) {
    if (!req.params.ID) return res.status(400).send({StatusCode: 400, Data: {}, Message: 'Required ID', Results: 0})
    if (!req.userComplete) return res.status(401).send({
        StatusCode: 401,
        Data: {},
        Message: `Required Login`,
        Results: 0
    })
    Categoria_Schema.findByIdAndRemove({_id: req.params.ID}).exec((error, respuesta) => {
        if (error) {
            return res.status(500).send({StatusCode: 500, Data: {}, Message: error, Results: 0})
        } else {
            return res.status(200).send({StatusCode: 200, Data: respuesta, Message: 'Operation Successful', Results: 1})
        }
    })
}

module.exports = {
    eliminar
}
