var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;


var Usuario = require('../models/usuario');

// Verificar token

exports.verificaToken = function(req, res, next) {
    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }

        req.Usuario = decoded.usuario;

        next();

    });
}