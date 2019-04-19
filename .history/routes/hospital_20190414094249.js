var express = require('express');
var bcrypt = require('bcryptjs');

var mdAutenticacion = require('../middleware/autenticacion');

var app = express();

var hospitales = require('../models/hospital');

// ----------------------------
// obtener todos los hospitales
// ----------------------------


app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
});


// ----------------------------
// crear hospital
// ----------------------------

app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var hospital = new Hospital({
        nombre: body.nombre,
        img: body.img,
        usuario: body.usuario
    });

    hospital.save((err, hospitalGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el hospital',
                error: err
            });
        }

        res.status(201).json({
            ok: true,
            hospitalGuardado,
            usuariotoken: req.usuario
        })

    });

});

module.exports = app;