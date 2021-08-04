'use strict'

const Mongoose = require('mongoose')
const Categoria_Schema = Mongoose.model('Categoria_Schema')
const config = require('./../../configuracion')

function register(req, res) {
    if (req.files && req.files.length) {
        req.files.forEach(objectImage => {
            req.body.icon = `${config.UrlBackend}${objectImage.filename}`
        })
    }
    const categoria = new Categoria_Schema({
        contentCategory: req.body.contentCategory,
        // [
        //   {
        //     languaje: { type: String, default: 'Español' },
        //     name: { type: String, default: 'Vacío' },
        //     description: { type: String, default: 'The best category' },
        //     words: { type: [String], default: [] }
        //   }
        // ],
        color: req.body.color || '#42CDC4',
        icon: req.body.icon || `${config.UrlBackend}imgstatic/category_none.png`,
        locked: req.body.locked || true,
        isNew: req.body.isNew || true,
        created: Date.now(),
        personal: true
    });
    categoria.save()
        .then(ok => {
            return res.status(200).send({StatusCode: 200, Data: categoria, Message: 'Operation Successful', Results: 1})
        })
        .catch(error => {
            return res.status(500).send({StatusCode: 500, Data: {}, Message: error, Results: 0})
        })
}

function anadir(req, res) {
    Categoria_Schema.findOne({_id: req.params.ID}).exec((error, respuesta) => {
        if (error) {
            return res.status(500).send({StatusCode: 500, Data: {}, Message: error, Results: 0})
        } else if (!respuesta) {
            return res.status(404).send({StatusCode: 404, Data: {}, Message: 'Not found', Results: 0})
        } else if (respuesta) {
            respuesta.words_es.push(req.body.words_es)
            respuesta.words_en.push(req.body.words_en)
            respuesta.save()
                .then(ok => {
                    return res.status(200).send({
                        StatusCode: 200,
                        Data: respuesta,
                        Message: 'Operation Successful',
                        Results: 1
                    })
                })
                .catch(error => {
                    return res.status(500).send({StatusCode: 500, Data: {}, Message: error, Results: 0})
                })
        }
    })
}

module.exports = {
    register,
    anadir
}
