var express = require('express');

var app = express();

var Hospital = require('../models/hospital');
var Medico = require('../models/medico');

app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Hospital.find({ nombre: regex }, (err, hospitales) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No existen con ese nombre'
            });
        }

        res.status(200).json({
            ok: true,
            hospitales
        });

    });

});

function buscarHospitales(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Hospital.find({ nombre: regex }, (err, hospitales) => {

            if (err) {
                reject('Error al cargar hospitales', err)
            } else {
                resolve(hospitales);
            }

        });

    });

}

module.exports = app;