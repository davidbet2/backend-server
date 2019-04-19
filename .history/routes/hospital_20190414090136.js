var express = require('express');
var bcrypt = require('bcryptjs');

var mdAutenticacion = require('../middleware/autenticacion');

var app = express();

var hospitales = require('../models/hospital');