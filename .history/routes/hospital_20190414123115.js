var express = require('express');
var mdAutenticacion = require('../middleware/autenticacion');

var app = express();
var Hospital = require('../models/hospital');

// ----------------------------
// obtener todos los hospitales
// ----------------------------


app.get('/', (req, res, next) => {

    Hospital.find({}).exec(
        (err, hospitales) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando los hospitales',
                    error: err
                });
            }

            res.status(200).json({
                ok: true,
                hospitales
            });
        }
    );
});

// ----------------------------
// Actualizar hospital
// ----------------------------

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Hospital.findById(id, (err, hospital) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el usuario',
                error: err
            });
        }

        if (!hospital) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El hospital no existe'
            })
        }

        hospital.nombre = body.nombre;
        hospital.usuario = req.id

        hospital.save((err, hospitalGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el hospital',
                    error: err
                });
            }

            res.status(200).json({
                ok: true,
                hospitalGuardado
            });
        });

    });

});

// ----------------------------
// crear hospital
// ----------------------------

app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var hospital = new Hospital({
        nombre: body.nombre,
        usuario: req.params.usuario.id
    });

    hospital.save((err, hospitalGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el hospital',
                error: err
            });
        };

        res.status(201).json({
            ok: true,
            hospital: hospitalGuardado
        });

    });

});

// ----------------------------
// Borrar hospital
// ----------------------------

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Hospital.findByIdAndRemove(id, (err, hospitalBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el hospital',
                error: err
            });
        }

        if (!hospitalBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe el hospital con el id'
            });
        }

        res.status(200).json({
            ok: true,
            hospitalBorrado
        });

    });

});

module.exports = app;