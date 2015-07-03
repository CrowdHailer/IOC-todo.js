(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Application = require('./core/application');

Application.mount('clear-completed', function (context, root) {
	root.addEventListener('click', function (evt) {
		context.log('clicked');
	});
});

Application.mount('new-todo', require('./features/new-todo'))

module.exports = Application;

},{"./core/application":2,"./features/new-todo":4}],2:[function(require,module,exports){
'use strict';

var features = {};

function Application(context, root) {
	// context.logger.log('hello');
	// context.log('helo')
	// console.log(context.version);
	this.context = context;
	this.root = root;
}

// animate - bad because of animation
Application.prototype.startAll = function (root) {
	// this.context.log(this.root)
	// TODO multiple startups
	// TODO handle missing
	var featureElements = root.querySelectorAll('[data-feature]');
	for (var i = 0, len = featureElements.length; i < len; i++) {
		this.start(featureElements[i]);
	}
};

Application.prototype.start = function (featureElement) {
	var featureName = featureElement.dataset.feature;
	var feature = features[featureName];

	if (feature) {
		feature.factory(this.context, featureElement);
	}
};

// options live on datalist
Application.mount = function (hook, factory) {
	features[hook] = {
		factory: factory
	};
};

Application.init = function (context, root) {
	var app = new Application(context, root);
	app.startAll(root);
	return app;
};

module.exports = Application;

},{}],3:[function(require,module,exports){
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

	options = options || {};
	var exports = options.exports;

    if (exports) {
        var method = exports[0];
		Object.defineProperty(Sandbox.prototype, method, {get: function () {
			return this.getService(name)[method];
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

module.exports = Infrastructure;

},{}],4:[function(require,module,exports){
module.exports = function (context, root) {
	var $ = context.dom;
	var $form = $.queryHook(root, 'new-todo');
	var $input = $.querySelector($form, 'input');

	$form.addEventListener('submit', function (event) {
		event.preventDefault();
		context.log($input.value);
	});
};

},{}],5:[function(require,module,exports){
var enviroment = window;
var root = window.document;
var options = {debug: true};

var App = require('./app');
var Infrastructure = require('./infrastructure');

var infrastructure = Infrastructure.init(enviroment, options);

enviroment.todo = App.init(infrastructure.sandbox(), root);

},{"./app":1,"./infrastructure":6}],6:[function(require,module,exports){
'use strict';

var Infrastructure = require('./core/infrastructure');

Infrastructure.use('logger', require('./services/logger'), {exports: ['log', 'version'], label: 'DEBUG'});
Infrastructure.use('dom', require('./services/dom'));

module.exports = Infrastructure;

},{"./core/infrastructure":3,"./services/dom":7,"./services/logger":8}],7:[function(require,module,exports){
module.exports = function (context, options) {
    return {
		querySelector: function (root, selector) {
			return root.querySelector(selector);
		},
		queryHook: function (root, hook) {
			return this.querySelector(root, '[data-hook~=' + hook + ']');
		}
	};
};

},{}],8:[function(require,module,exports){
module.exports = function (context, options) {
    options = options || {label: ''};
    var label = options.label + ':';

    var console = context.getGlobal('console'),
        log = console.log.bind(console, label),
        info = console.info.bind(console, label),
        warn = console.warn.bind(console, label);

    return {
        log: log,
        info: info,
        warn: warn
    };
};

},{}]},{},[5]);
