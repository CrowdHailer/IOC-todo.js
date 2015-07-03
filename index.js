(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!

})(window);

},{}],2:[function(require,module,exports){
var enviroment = window;
var root = window.document;
var options = {debug: true};

var App = require('./app');
var Infrastructure = require('./infrastructure');

var infrastructure = Infrastructure.init(enviroment, options);

enviroment.todo = App.init(infrastructure.sandbox(), root);

},{"./app":1,"./infrastructure":3}],3:[function(require,module,exports){
'use strict';

var base, Base;

Base = function (argument) {
	var services = {};
	this.use = function () {
		console.log(arguments);
		console.log(this);
	};
	this.services = function () {
		return services
	}
};
function Infrastructure() {
	// body...
}
Base.prototype.init = function (global, options) {
	return new Infrastructure(this.services());
};

Base.construct = function (builder) {
	var child = new this();
	builder(child);
	return child;
};



var loggerFactory = function (argument) {
	// body...
}

base = Base.construct(function(core){
	core.use('logger', loggerFactory, {label: 'DEBUG', exports: ['log']});
});


module.exports = base;

function Services() {
	// body...
}

},{}]},{},[2]);
