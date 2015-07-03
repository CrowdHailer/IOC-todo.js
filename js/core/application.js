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
