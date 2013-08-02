/* global indexedDB,IDBKeyRange */
(function(window) {
	"use strict";
	var webstudy = window.webstudy;
	if (webstudy === undefined) {
		webstudy = {};
	}

	var sampleDB = webstudy.sampleDB = {};

	/**
	 * 
	 * @param {String} txAttr
	 * @param {Function} txComplete
	 * @param {Function} txError
	 * @returns {objectStore}
	 */
	function getObjectStore(txAttr, txComplete, txError) {
		var db = sampleDB.db;
		var tx = db.transaction("sample", txAttr);
		var store = tx.objectStore("sample");
		tx.oncomplete = txComplete;
		tx.onerror = txError || function(e) {
			console.log(e);
		};
		return store;
	}

	/**
	 * @memberOf sampleDB
	 */
	sampleDB.open = function() {
		var version = 1;
		var request = indexedDB.open("samples", version);

		request.onupgradeneeded = function() {
			var db = request.result;
			db.createObjectStore("sample", {
				keyPath : "key"
			});
		};
		request.onsuccess = function() {
			sampleDB.db = request.result;

		};
	};
	/**
	 * @memberOf sampleDB
	 */
	sampleDB.addData = function(record) {
		var store = getObjectStore("readwrite", function() {
			console.log("addData OK");
		});
		store.put({
			key : record.key,
			value : record.value
		});
	};
	/**
	 * @memberOf sampleDB
	 */
	sampleDB.clearData = function(key) {
		var store = getObjectStore("readwrite", function() {
			console.log("clearData OK");
		});
		store.delete(key);
	};
	/**
	 * @memberOf sampleDB
	 */
	sampleDB.getData = function(key, onsuccess) {
		var store = getObjectStore("readonly");
		var request = store.get(key);
		request.onsuccess = function() {
			if (onsuccess === undefined) {
				if (request.result === undefined) {
					alert("指定されたキーはありません");
				} else {
					alert(request.result.value || "指定されたキーはありません");
				}
			} else {
				onsuccess(request);
			}
		};
	};
	/**
	 * @memberOf sampleDB
	 */
	sampleDB.clearAllData = function() {
		var store = getObjectStore("readwrite");
		store.clear();
	};
	/**
	 * @memberOf sampleDB
	 */
	sampleDB.getAllData = function(onsuccess) {
		var store = getObjectStore("readonly");
		var keyRange = IDBKeyRange.lowerBound(0);
		var request = store.index("key").openCursor(keyRange);
		request.onsuccess = function() {
			if (onsuccess !== undefined) {
				onsuccess(request);
			}
		};
	};
	window.webstudy = webstudy;
})(window);
