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
Application.prototype.startAll = function (first_argument) {
	// this.context.log(this.root)
	// TODO multiple startups
	// TODO handle missing
	var element = this.root.querySelector('[data-feature]');
	var feature = element.dataset.feature
	// each feature to get own context
	features[feature].factory(this.context, element);
};

// options live on datalist
Application.mount = function (hook, factory) {
	features[hook] = {
		factory: factory
	};
};

Application.init = function (context, root) {
	var app = new Application(context, root);
	app.startAll();
	return app;
};

module.exports = Application;
