'use strict'

const Mongoose = require ('mongoose')
const ModeloMongo = require ('../ModeloMongo/index')
const Categoria_Schema = Mongoose.model('Categoria_Schema')
const config = require ('./../../configuracion')

function modify (req, res) {
  if (!req.params.ID) return res.status(400).send({StatusCode: 400, Data: {}, Message: 'Faltan Campos', Results: 0})
  if (!req.userComplete) return res.status(401).send({StatusCode: 401, Data: {}, Message: `Required Login`, Results: 0})
  Array.prototype.unique=function(a){
    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
  })
  if (req.files && req.files.length) {
    req.files.forEach(objectImage => {
      req.body.icon = `${config.UrlBackend}${objectImage.filename}`
    })
  }
  if (req.body.contentCategory && req.body.contentCategory.length) {
    req.body.contentCategory.forEach(language => {
      language.words.unique()
    })
  }
  Categoria_Schema.findByIdAndUpdate(req.params.ID, req.body, (error, respuesta) => {
    if (error) {
      return res.status(500).send({StatusCode: 500, Data: {}, Message: error, Results: 0})
    } else {
      return res.status(200).send({StatusCode: 200, Data: respuesta, Message: 'Operation Successful', Results: 1})
    }
  })
}
module.exports = {
    modify
}
