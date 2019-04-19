var express = require('express');
var bcrypt = require('bcryptjs');

var mdAutenticacion = require('../middleware/autenticacion');

var app = express();

var hospitales = require('../models/hospital');

// ---------------------------
// obtener todos los usuarios
// ---------------------------


app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
});

module.exports = app;