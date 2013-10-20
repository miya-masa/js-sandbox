(function(window) {
	"use strict";

	var webstudy = window.webstudy;
	if (webstudy === undefined) {
		webstudy = {};
	}
	webstudy.util = {
		getJson : function() {
			return {
				someBoolean : true,
				someString : "someString",
				someNumber : "someNumber",
				someFunction : function() {
					return "invokeFunction";
				}
			};
		}
	};

	window.webstudy = webstudy;
})(window);
