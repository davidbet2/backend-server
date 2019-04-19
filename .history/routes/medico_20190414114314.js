var express = require('express');

var mdAutenticacion = require('../middleware/autenticacion');
var app = express();

var Medico = require('../models/medico');