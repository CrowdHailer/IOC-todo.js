'use strict';

var Infrastructure = require('./core/infrastructure');

Infrastructure.use('logger', require('./services/logger'), {exports: ['log', 'version'], label: 'DEBUG'});
Infrastructure.use('dom', require('./services/dom'));

module.exports = Infrastructure;
