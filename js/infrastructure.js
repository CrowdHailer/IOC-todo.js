'use strict';

var services = {};

function Sandbox(infrastructure) {
	this.infrastructure = infrastructure;
}

Sandbox.prototype.getService = function (){
    return this.infrastructure.getService.apply(this.infrastructure, arguments);
};

function Infrastructure(global, options) {
	this.getGlobal = function (name) {
        if (name in global) { return global[name]; }
        return null;
    };
	this.getService = function (name) {
		var service = services[name],
	        instance = service.instance,
	        infrastructure = this;

	    if (instance) { return instance; }

	    instance = service.factory(infrastructure, service.options);
	    service.instance = instance;

	    return instance;
	};
}

// engage
// employ
// utilize
// implement
Infrastructure.use = function (name, factory, options) {
	// separate services object
    // this.services.add(factory, options)
    // Throws custom error
    services[name] = {
        factory: factory,
        options: options,
        instance: null
    };

	Object.defineProperty(Sandbox.prototype, name, {get: function () {
		return this.getService(name);
	}});

	var exports = options.exports;

    if (exports) {
        var method = exports[0];
		Object.defineProperty(Sandbox.prototype, method, {get: function () {
			return this.getService(name)[method];
		}});
        var method2 = exports[1];
		console.log(method2);
		Object.defineProperty(Sandbox.prototype, method2, {get: function () {
			return this.getService(name)[method2];
		}});
    }
};

// context
Infrastructure.prototype.sandbox = function (first_argument) {
	return new Sandbox(this);
};

// create
Infrastructure.init = function (world, options) {
	return new this(world, options);
};


function LoggerFactory(context, options) {
    options = options || {label: ''};
    var label = options.label + ':'

    var console = context.getGlobal('console'),
        log = console.log.bind(console, label),
        info = console.info.bind(console, label),
        warn = console.warn.bind(console, label);

    return {
        log: log,
        info: info,
        warn: warn,
		version: 7
    };
}

Infrastructure.use('logger', LoggerFactory, {exports: ['log', 'version'], label: 'DEBUG'});

module.exports = Infrastructure;
