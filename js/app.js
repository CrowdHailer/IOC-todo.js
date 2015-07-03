'use strict';

var Application = require('./core/application');

Application.mount('clear-completed', function (context, root) {
	root.addEventListener('click', function (evt) {
		context.log('clicked');
	});
});

module.exports = Application;
