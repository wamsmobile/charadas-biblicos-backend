'use strict'

const express = require('express')
const sesion = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const methodOverride = require('method-override')
const config = require('./../configuracion')
const DB = require('./ModeloMongo/index')
const firebase = require('firebase-admin')

const App = express()

App.use(bodyParser.urlencoded())
App.use(bodyParser.json())
App.use(methodOverride())
App.use(cors())
App.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept')
    next()
})
App.use(sesion({
    secret: config.TOKEN_SECRETO,
    resave: true,
    saveUninitialized: true,
    name: 'Template',
    cookie: {
        secure: true,
        expires: new Date(Date.now() + 3600000),
        maxAge: 3600000,
        httpOnly: false
    }
}))

firebase.initializeApp({
    credential: firebase.credential.cert(config.Google),
    databaseURL: `https://charadas-max.firebaseio.com`
})

// Middlewares
const multer = require('./middleware/multer').middlewareMultimedia
const autenticate = require('./middleware/validate')

// Static Routes
App.use(express.static(__dirname + './../static'));
App.use('/static', express.static(__dirname + './../static'))

// Revisar aqui

const CategoriaBusquedas = require('./Categorias/Obtener')
const CategoriaCrear = require('./Categorias/Crear')
const CategoriaModificar = require('./Categorias/Modificar')
const CategoriaEliminar = require('./Categorias/Eliminar')

App.get('/api/category/all', CategoriaBusquedas.all)
App.get('/api/category/ID/:ID', CategoriaBusquedas.id)
App.post('/api/category/register', CategoriaCrear.register)
App.post('/api/category/register/name/:name/word', CategoriaCrear.anadir)
App.put('/api/category/ID/:ID', autenticate.validateWithToken, multer.any(), CategoriaModificar.modify)
App.delete('/api/category/ID/:ID', CategoriaEliminar.eliminar)

const UsersGET = require('./Users/get')
const UsersPOST = require('./Users/post')
App.get('/api/users/getmyuser', autenticate.validateWithToken, UsersGET.getmyuser)
App.post('/api/users/register', UsersPOST.newUser)
App.post('/api/users/login', autenticate.basicLogin)

const DispositiveGET = require('./Dispositives/get')
const DispositivePOST = require('./Dispositives/post').createOrUpdate
App.get('/api/device/getall', autenticate.validateWithToken, DispositiveGET.getAll)
App.post('/api/device/registerorupdated', DispositivePOST)

const Notifications = require('./Notifications/send')
App.post('/api/notification/send', autenticate.validateWithToken, Notifications.sendNotfication)

const Configuracion = require('./Configuration_Schema/index')
App.get('/api/configuracion_languajes/getall', autenticate.validateWithToken, Configuracion.getConfig)
App.post('/api/configuracion_languajes/create', autenticate.validateWithToken, Configuracion.createConfig)
App.put('/api/configuracion_languajes/modify', autenticate.validateWithToken, Configuracion.updateConfig)

App.all('/*', (req, res) => {
    console.log(`Rechaze Peticion invalida de ${req.url} a traves del metodo ${req.originalMethod}`)
    res.status(404).send({StatusCode: 404, Data: '', Message: 'Esta página no existe', Results: 0})
    //res.sendFile(__dirname + "index.html") //ruta a la pagina 404
})

module.exports = App
