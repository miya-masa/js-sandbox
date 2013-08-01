$(function() {

    /**
     * 結果領域をクリアする.
     */
    function clearResult() {
	var $result = $("#result ul");
	$result.empty();
    }
    /**
     * 結果領域にDOMを追加する.
     * 
     * @param {string} text 追加するテキスト
     */
    function appendResult(text) {
	var $result = $("#result ul");
	var $target = $("<li>");
	$target.text(text).appendTo($result);
    }

    // イベントハンドラ

    $("#button-click-id").click(function() {
	console.log("#button-clicked!");
	appendResult("Clicked");
    });

    $("#button-clear-id").click(function() {
	console.log("#clear-clicked!");
	clearResult();
    });

    $("#button-getJson-id").click(function() {
	console.log("#getJson-clicked!");
	var someJson = util.getJson();
	appendResult(someJson.someString);
	appendResult(someJson.someFunction());
    });

    $("#button-throwException-id").click(function() {
	console.log("#throwException-clicked!");
	try {
	    throw "throw Exception!!";
	} catch (e) {
	    throw "Rethrow Exception!!";
	}
    });

    $("#button-appendStorage-id").click(function() {

	localStorage.setItem("key", "storageValue");
	appendResult("ローカルストレージに保存!");
    });

    $("#button-appendCookie-id").click(function() {
	$.cookie("key", "cookieValue");
	appendResult("クッキーを保存!");
    });
});
