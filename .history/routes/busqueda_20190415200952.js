var express = require('express');

var app = express();

var Hospital = require('../models/hospital');

app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Hospital.find({ nombre: regex }, (err, hospitales) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No existen hospitales con ese nombre'
            });
        }

        res.status(200).json({
            ok: true,
            hospitales
        });

    });

});

module.exports = app;