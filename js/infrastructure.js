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
