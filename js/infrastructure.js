'use strict';

var Infrastructure = require('./core/infrastructure');

Infrastructure.use('logger', require('./services/logger'), {exports: ['log', 'version'], label: 'DEBUG'});
Infrastructure.use('dom', require('./services/dom'));
Infrastructure.use('mediator', require('./services/mediator'), {exports: ['broadcast']});

module.exports = Infrastructure;
