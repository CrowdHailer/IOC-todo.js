module.exports = function (context, root) {
	var $ = context.dom;
	var $form = $.queryHook(root, 'new-todo');
	var $input = $.querySelector($form, 'input');

	$form.addEventListener('submit', function (event) {
		event.preventDefault();
		context.broadcast('new-todo', $input.value);
		$input.value = '';
	});
};
