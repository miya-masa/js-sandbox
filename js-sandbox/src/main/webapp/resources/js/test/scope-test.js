(function() {
	"use strict";

	var log = myms.log;

	test(
			"スコープの確認",
			function() {

				ok(true, "グローバルエリアスタート========================================");
				ok(typeof outer === 'function', "outer()はスコープの中");
				ok(typeof inner === 'function', "inner()はスコープの中");
				ok(typeof a === 'number', "aはスコープの中");
				ok(typeof b === 'number', "bはスコープの中");
				ok(typeof c === 'number', "cはスコープの中");

				function outer() {
					ok(true,
							"outer関数スタート========================================");

					ok(typeof outer === 'function', "outer()はスコープの中");
					ok(typeof inner === 'function', "inner()はスコープの中");
					ok(typeof a === 'number', "aはスコープの中");
					ok(typeof b === 'number', "bはスコープの中");
					ok(typeof c === 'number', "cはスコープの中");

					var a = 10;

					ok(true,
							"outer関数内 var aを定義直後========================================");
					ok(typeof outer === 'function', "outer()はスコープの中");
					ok(typeof inner === 'function', "inner()はスコープの中");
					ok(typeof a === 'number', "aはスコープの中");
					ok(typeof b === 'number', "bはスコープの中");
					ok(typeof c === 'number', "cはスコープの中");

					function inner() {
						ok(true,
								"inner関数スタート========================================");
						ok(typeof outer === 'function', "outer()はスコープの中");
						ok(typeof inner === 'function', "inner()はスコープの中");
						ok(typeof a === 'number', "aはスコープの中");
						ok(typeof b === 'number', "bはスコープの中");
						ok(typeof c === 'number', "cはスコープの中");

						var b = 20;
						ok(true,
								"inner関数内 var bを定義直後========================================");
						ok(typeof outer === 'function', "outer()はスコープの中");
						ok(typeof inner === 'function', "inner()はスコープの中");
						ok(typeof a === 'number', "aはスコープの中");
						ok(typeof b === 'number', "bはスコープの中");
						ok(typeof c === 'number', "cはスコープの中");

						if (a === 10) {
							ok(true,
									"inner関数内 ifブロックスタート========================================");
							ok(typeof outer === 'function', "outer()はスコープの中");
							ok(typeof inner === 'function', "inner()はスコープの中");
							ok(typeof a === 'number', "aはスコープの中");
							ok(typeof b === 'number', "bはスコープの中");
							ok(typeof c === 'number', "cはスコープの中");
							var c = 30;
							ok(true,
									"inner関数内 ifブロック内var c定義直後========================================");
							ok(typeof outer === 'function', "outer()はスコープの中");
							ok(typeof inner === 'function', "inner()はスコープの中");
							ok(typeof a === 'number', "aはスコープの中");
							ok(typeof b === 'number', "bはスコープの中");
							ok(typeof c === 'number', "cはスコープの中");
						}
						ok(true,
								"inner関数内 ifブロック終了直後========================================");
						ok(typeof outer === 'function', "outer()はスコープの中");
						ok(typeof inner === 'function', "inner()はスコープの中");
						ok(typeof a === 'number', "aはスコープの中");
						ok(typeof b === 'number', "bはスコープの中");
						ok(typeof c === 'number', "cはスコープの中");
					}
					inner();
					ok(true,
							"inner関数 終了直後========================================");
					ok(typeof outer === 'function', "outer()はスコープの中");
					ok(typeof inner === 'function', "inner()はスコープの中");
					ok(typeof a === 'number', "aはスコープの中");
					ok(typeof b === 'number', "bはスコープの中");
					ok(typeof c === 'number', "cはスコープの中");
				}
				outer();
				ok(true, "outer関数 終了直後========================================");
				ok(typeof outer === 'function', "outer()はスコープの中");
				ok(typeof inner === 'function', "inner()はスコープの中");
				ok(typeof a === 'number', "aはスコープの中");
				ok(typeof b === 'number', "bはスコープの中");
				ok(typeof c === 'number', "cはスコープの中");
			});

})();