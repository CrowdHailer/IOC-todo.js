module.exports = function (infrastructure, options) {
	var context = infrastructure.sandbox();

    return {
		broadcast: function (channel, message) {
			context.log(channel, message);
		}
	};
};
