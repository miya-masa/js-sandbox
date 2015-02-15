(function() {
	"use strict";

	var log = myms.log;

	test("thisの確認テスト", function() {

		// thisを返す関数
		var retThis = function() {
			log(this);
			return this;
		};

		ok(typeof this === 'object', "test内のthisはQunitの呼び出しコンテクスト");
		ok(retThis() === undefined, "test内のretThis呼び出しはundefined");

		var obj = {
			fn : retThis
		};

		ok(obj.fn() === obj, "objのfnにretThisは指定した場合はobj");

		var obj2 = {
			fn : obj.fn
		};

		ok(obj2.fn() === obj2, "obj2のfnにobjのfnを指定した場合はobj2");
		var obj3 = {};
		var obj4 = {
			fn : obj.fn.bind(obj3)
		};
		ok(obj4.fn() === obj3, "obj4のfnにobj3をbindした場合はobj3");
		ok(obj2.fn.call(obj3), "obj2のfnにobj3をcallに指定した場合はobj3");

	});

})();