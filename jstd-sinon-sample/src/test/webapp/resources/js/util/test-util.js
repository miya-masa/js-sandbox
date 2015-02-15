(function() {
	// ��jQuery object��ۊ�
	var _jQuery = jQuery;

	// jQuery, $�̗���stub������K�v������̂Œ���
	sinon.stub(window, 'jQuery', init_stub);
	sinon.stub(window, '$', init_stub);

	// jQuery��function property�͎����Ōp�������̂ŁA����function�͌Ăяo�����̓���̂ݑz�肷���OK
	function init_stub(arg) {
		// function�̏ꍇ�������Ȃ�
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