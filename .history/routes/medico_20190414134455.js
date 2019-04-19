var express = require('express');

var mdAutenticacion = require('../middleware/autenticacion');
var app = express();

var Medico = require('../models/medico');

// ----------------------------
// obtener todos los Medicos
// ----------------------------

app.get('/', (req, res, next) => {

    var body = req.body;

    Medico.find({}).exec(
        (err, medicos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'No existen medicos',
                    error: err
                });
            };

            res.status(200).json({
                ok: true,
                medicos
            });
        }
    );

});


// ----------------------------
// guardar los Medicos
// ----------------------------

app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var medico = new Medico({
        nombre: body.nombre,
        usuario: req.usuario._id,
        hospital: body.hospital
    });

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
            medico: medicoGuardado
        });

    });

});


module.exports = app;