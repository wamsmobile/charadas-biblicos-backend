'use strict'

const mongoose = require ('mongoose')
const fs = require ('fs')
const http = require ('http') // Montar Servidor normal
const https = require ('https') // Montar Servidor con certificacion
const config = require ('./configuracion')
const App = require ('./src/Enlaces')

var wamsServer = false

  wamsServer = http.createServer(App)
  console.log(`🚀 🚀 🚀 Starting server in normal mode... 🎚 🎛 🔧`)

mongoose.connect(config.BASEDEDATOS, {useNewUrlParser: true}, (errorMongo, okMongo) => {
  if (errorMongo) return console.log(`😱 😱 😱 La base de datos ${config.BASEDEDATOS} no se conecto con exito. ${errorMongo}`)
  else {
    console.log(`Conexion a la Base de Datos ${config.BASEDEDATOS}, Establecida! 👍 👍 👍 `)
    wamsServer.listen(config.PORT, (errorConection, conection) => {
      if (errorConection) return console.log(`😱 😱 😱 El Puerto ${config.PORT} se encuentra ocupado. ${errorConection}`)
      else {
        useMongoClient: true
        console.log(`Servidor Corriendo en el puerto ${config.PORT}! 👍 👍 👍 `)
      }
    })
  }
})
