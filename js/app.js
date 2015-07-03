'use strict';

var Application = require('./core/application');

Application.mount('clear-completed', function (context, root) {
	root.addEventListener('click', function (evt) {
		context.log('clicked');
	});
});

Application.mount('new-todo', require('./features/new-todo'))

module.exports = Application;
