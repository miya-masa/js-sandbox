/**
 * @namespace
 */
var myms = {};
/**
 * 名前空間にユーティリティをセットする.
 */
(function(namespace) {
	"use strict";

	/**
	 * ログメソッド.
	 */
	var log = function() {
		try {
			console.log.apply(console, arguments);
		} catch (e) {
			try {
				opera.postError.apply(opera, arguments);
			} catch (e) {
				alert(Array.prototype.join.call(arguments, " "));
			}
		}
	};

	namespace.log = log;

}(myms));
