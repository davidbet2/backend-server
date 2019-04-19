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

// ----------------------------
// actualizar los Medicos
// ----------------------------

app.put('/:id', (req, res) => {

    var id = req.params.id;

    Medico.findById(id, (err, actualizarMedico) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se encontro el id del medico',
                error: err
            });
        }

        if (!actualizarMedico) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El id del medico no existe'
            })
        }

        body.nombre = medico.nombre;
        usuario = req.usuario._id;
        hospital = body.hospital;

        medico.save((err, medicoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'No se pudo actualizar el medico',
                    error: err
                });
            }

            res.status(200).json({
                ok: true,
                medico: medicoGuardado
            });

        });

    });

});


module.exports = app;