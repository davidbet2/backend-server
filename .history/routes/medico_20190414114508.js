var express = require('express');

var mdAutenticacion = require('../middleware/autenticacion');
var app = express();

var Medico = require('../models/medico');

// ----------------------------
// obtener todos los Medicos
// ----------------------------

app.get('/', (req, res, next) => {

    return res.status(200).json({
        ok: true,
        mensaje: 'Medicos'
    });

});