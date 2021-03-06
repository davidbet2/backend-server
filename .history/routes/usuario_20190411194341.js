var express = require('express');

var app = express();

var Usuario = require('../models/usuario');

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
            })

});

module.exports = app;