var express = require('express');
var bcrypt = require('bcryptjs');

var mdAutenticacion = require('../middleware/autenticacion');

var app = express();

var Hospital = require('../models/hospital');

// ----------------------------
// obtener todos los hospitales
// ----------------------------


app.get('/', (req, res, next) => {


    Hospital.find({}, 'nombre').exec(
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