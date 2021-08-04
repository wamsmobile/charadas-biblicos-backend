'use strict'

const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Categoria_Schema = Schema({
    contentCategory: [
        {
            languaje: {type: String, default: 'Español'},
            name: {type: String, default: 'Vacío'},
            description: {type: String, default: 'The best category'},
            words: {type: [String], default: []}
        }
    ],
    color: {type: String, default: '#42CDC4'},
    icon: {type: String, default: 'http://localhost:3001/static/imgstatic/category_none.png'},
    locked: {type: Boolean, default: true},
    isNewCategory: {type: Boolean, default: true},
    created: {type: Date, default: Date.now()},
    personal: {type: Boolean, default: true}
})

const Usuario_Schema = Schema({
    username: {type: String, unique: true},
    password: {type: String, default: null},
    authorized: {type: Boolean, default: false}
})

const Dispositives_Schema = Schema({
    dispositive: {type: String, unique: true},
    FCI: {type: String, unique: false},
    notifications: {type: String, default: true}
})

const Config_Schema = Schema({
    languagues: {type: [String], default: ['Español', 'English']}
})

module.exports = {
    Categoria_Schema: Mongoose.model('Categoria_Schema', Categoria_Schema),
    Usuario_Schema: Mongoose.model('Usuario_Schema', Usuario_Schema),
    Dispositives_Schema: Mongoose.model('Dispositives_Schema', Dispositives_Schema),
    Config_Schema: Mongoose.model('Config_Schema', Config_Schema)
}
