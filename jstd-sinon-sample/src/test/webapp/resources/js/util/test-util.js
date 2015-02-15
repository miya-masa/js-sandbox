(function() {
	// 元jQuery objectを保管
	var _jQuery = jQuery;

	// jQuery, $の両方stub化する必要があるので注意
	sinon.stub(window, 'jQuery', init_stub);
	sinon.stub(window, '$', init_stub);

	// jQueryのfunction propertyは自動で継承されるので、このfunctionは呼び出し時の動作のみ想定すればOK
	function init_stub(arg) {
		// functionの場合何もしない
		if (_jQuery.isFunction(arg)) {
			return;
		}
		return _jQuery.apply(this, arguments);
	}
})();

var TestUtils = {
	refreshFixture : function($appended) {
		$appended.empty();
		var response = $.ajax({
			async : false,
			url : "/test/src/test/webapp/resources/js/serve/fixture.html"
		});
		$appended.append($(response.responseText));
		jstestdriver.console.log("JsTestDriver", response.responseText);
	},
	ready : function() {
		for ( var i = 0; i < $.args.length; i++) {
			var func = $.args[i][0];
			if ($.isFunction(func)) {
				func();
			}
		}

	}
};