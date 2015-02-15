TestCase("hello world test", {

	testSuccess : function() {
		var hello = new myapp.Hello();
		assertEquals("Hello miya!!", hello.sayHello("miya"));
	},
	testSpecial : function() {
		var hello = new myapp.Hello();
		hello.sayHello("special");
		assertEquals("Special!!!", hello.sayHello("special"));
	}
});

TestCase("dom test", {
	setUp : function() {
		TestUtils.refreshFixture($("body"));
		TestUtils.ready();
	},
	testButtonClick : function() {
		var button = document.getElementById("button-id");
		assertEquals(false, button === undefined);
		$("#button-id").trigger("click");
		assertEquals(false, document.getElementById("div-add") === null);
		var $added = $("#div-add");
		assertEquals("add", $added.text());
	},
	testButtonClick2 : function() {
		assertEquals(true, document.getElementById("div-add") === null);
	}
});