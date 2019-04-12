express = require('express');
var bcrypt = require('bcryptjs');
var app = express();

var Usuario = require('../models/usuario');

app.post('/', (req, res) => {

    var body = req.body;

    res.status(200).json({
        ok: true,
        mensaje: 'login post correcto',
        body
    });
});

module.exports = app;