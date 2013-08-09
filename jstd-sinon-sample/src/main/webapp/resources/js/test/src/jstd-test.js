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
		var $body = $("body");
		var response = $.ajax({
			async : false,
			url : "/test/serve/fixture.html"
		});
		$body.append($(response.responseText));
		jstestdriver.console.log("JsTestDriver", response.responseText);
	},
	testButtonClick : function() {
		var button = document.getElementById("button-id");
		assertEquals(true, button);
		$("button-id").trigger("click");
		var $added = $("#div-add");
		assertEquals(true, $added);
		assertEquals("add", $added.text());
	},
	tearDown : function() {
		$("body").empty();
	}
});