var enviroment = window;
var root = window.document;
var options = {debug: true};

var App = require('./app');
var Infrastructure = require('./infrastructure');

var infrastructure = Infrastructure.init(enviroment, options);

enviroment.todo = App.init(infrastructure.sandbox(), root);
