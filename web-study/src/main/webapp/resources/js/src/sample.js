$(function() {
    var db = webstudy.sampleDB;
    var util = webstudy.util;
    db.open();

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
    /**
     * ストレージに値を保存する.
     * 
     * @param {sessionStrage|localStorage} storage
     */
    function appendStrage(storage) {
	var value = storage.getItem("key") || 0;
	value++;
	storage.setItem("key", value++);
    }

    // イベントハンドラ

    $("#button-click-id").click(function() {
	console.log("#button-clicked!");
	appendResult("Clicked");
    });

    $("#button-clear-id").click(function() {
	console.log("#clear-clicked!");
	clearResult();
	$.removeCookie("key", null);
	localStorage.removeItem("key");
	sessionStorage.removeItem("key");
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

    $("#button-appendLocalStorage-id").click(function() {
	appendStrage(localStorage);
	appendResult("ローカルストレージに保存!");
    });

    $("#button-appendSessionStorage-id").click(function() {
	appendStrage(sessionStorage);
	appendResult("セッションストレージに保存!");
    });

    $("#button-appendCookie-id").click(function() {
	var strage = {
	    getItem : $.cookie,
	    setItem : $.cookie
	};
	appendStrage(strage);
	appendResult("クッキーを保存!");
    });
});
