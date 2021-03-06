var express = require('express');

var app = express();

var Usuario = require('../models/usuario');

// Obtener todos los usuarios

app.get('/', (req, res, next) => {

    Usuario.find({}, 'nombre email img role')
        .exec(
            (err, usuarios) => {

                if (err) {
                    res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuarios ',
                        errors: err
                    })
                }

                res.status(200).json({
                    ok: true,
                    usuarios
                })
            });

});

// Crear un nuevo usuario

app.post('/', (req, res) => {
    var body = req.body;


    res.status(200).json({
        ok: true,
        body
    });

});

module.exports = app;