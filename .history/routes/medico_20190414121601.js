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

// ----------------------------
// guardar los Medicos
// ----------------------------

app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var medico = new Medico({
        nombre: body.nombre,
        usuario: req.id,
        hospital: body.hospital.id
    });

    console.log(medico);

    medico.save((err, medicoGuardado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se pudo guardar el medico',
                error: err
            });
        };

        if (!medicoGuardado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe el medico'
            });
        };

        res.status(201).json({
            ok: true,
            medicoGuardado
        });

    });

});


module.exports = app;