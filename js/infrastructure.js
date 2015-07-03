'use strict';

var Infrastructure = require('./core/infrastructure');

Infrastructure.use('logger', require('./services/logger'), {exports: ['log', 'version'], label: 'DEBUG'});

module.exports = Infrastructure;
