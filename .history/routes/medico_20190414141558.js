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

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Medico.findById(id, (err, medico) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se encontro el id del medico',
                error: err
            });
        }

        if (!medico) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El id del medico no existe'
            })
        };

        medico.nombre = body.nombre;
        medico.usuario = req.usuario._id;
        medico.hospital = body.hospital;

        medico.save((err, medicoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'No se pudo actualizar el medico',
                    error: err
                });
            };

            res.status(200).json({
                ok: true,
                medico: medicoGuardado
            });

        });

    });

});

// ----------------------------
// eliminar los Medicos
// ----------------------------

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.param.id;

    Medico.findByIdAndRemove(id, (err, medicoBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No se pudo eliminar el medico',
                error: err
            });
        };

        res.status(200).json({
            ok: true,
            medicoBorrado
        });

    });

});


module.exports = app;