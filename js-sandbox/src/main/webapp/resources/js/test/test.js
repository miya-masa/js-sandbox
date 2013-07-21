(function() {

	var log = myms.log;

	test("hello test", function() {
		log("hello test テストスタート");
		ok(1 == "1", "Passed!");
	});

	test("こんにちは！テスト！", function() {
		log("こんにちは テストスタート");
		ok(1 == "1", "テストOK!");
		ok(1 == "1", "テストOK!");
		ok(1 == "1", "テストOK!");
	});

	test("こんにちは！テスト！", function() {
		log("こんにちは！テスト2スタート");
		ok(1 == "2", "テストNG!");
		ok(1 == "1", "テストOK!");
		ok(1 == "1", "テストOK!");
	});
})();