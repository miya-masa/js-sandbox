/* global webstudy */
$(function() {
	"use strict";

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
		db.clearAllData();
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

	$("#button-appendIndexedDb-id").click(function() {
		for ( var int = 0; int < 100; int++) {
			var record = {
				key : int,
				value : "value"
			};
			db.addData(record);
		}

		appendResult("IndexedDBに保存!");
	});

	$(window).bind('devicemotion', function(event) {
		ax = event.originalEvent.accelerationIncludingGravity.x;
		ay = event.originalEvent.accelerationIncludingGravity.y;
		az = event.originalEvent.accelerationIncludingGravity.z;
		appendResult("x軸 :" + ax);
		appendResult("y軸:" + ay);
		appendResult("z軸:" + az);
	});
});
