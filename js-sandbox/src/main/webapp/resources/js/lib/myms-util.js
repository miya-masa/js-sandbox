/**
 * @namespace [myms]
 */
var myms = {};

/**
 * 名前空間にユーティリティをセットする.
 */
(function(namespace) {
	"use strict";

	/**
	 * ログメソッド.
	 * 
	 * @memberOf myms
	 */
	var log = function() {
		try {
			console.log.apply(console, arguments);
		} catch (e1) {
			try {
				opera.postError.apply(opera, arguments);
			} catch (e2) {
				alert(Array.prototype.join.call(arguments, " "));
			}
		}
	};

	namespace.log = log;

}(myms));
