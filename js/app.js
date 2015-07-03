'use strict';

var features = {};

function Application(context, root) {
	context.logger.log('hello');
	context.log('helo')
	console.log(context.version);

}

Application.init = function (context, root) {
	return new Application(context, root);
};

module.exports = Application;
