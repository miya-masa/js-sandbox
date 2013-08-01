var util = (function(window) {
    var util = {
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

    return util;

})(window);
