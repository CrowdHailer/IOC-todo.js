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
