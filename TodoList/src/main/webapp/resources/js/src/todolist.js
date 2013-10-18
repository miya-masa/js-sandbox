/**
 * 名前空間
 * 
 * @namespace todoList
 */
var todolist = {};
// todoリストのビジネスロジックの作成.
todolist.logic = (function(window) {
	'use strict';
	// キーのシーケンス用
	var KEY_SEQ_TODO_STRAGE = 'key.seq.todo.strage';
	localStorage.setItem(KEY_SEQ_TODO_STRAGE, '0');
	// 公開するロジック
	var logic = {
		/**
		 * 登録時のIDを取得する
		 * 
		 * @returns ID
		 */
		getNextId : function() {
			var id = +localStorage.getItem(KEY_SEQ_TODO_STRAGE);
			localStorage.setItem(KEY_SEQ_TODO_STRAGE, id + 1);
			return id;
		},
		/**
		 * 引数のtodoを保存する。todoのプロパティは期限(limit)とタスク内容(task)
		 * 
		 * @memberOf todolist.logic
		 * @param {Object} todo key、limit、taskを持つプロパティ
		 */
		saveTodo : function(todo) {
			var target = todo;
			if (typeof target === 'object') {
				target = JSON.stringify(todo);
			}
			localStorage.setItem(todo.key, target);
		},
		/**
		 * todoを取得する.
		 * 
		 * @param {String} 取得するキーID
		 * @returns {Object} key、limit、taskを持つオブジェクト.
		 */
		getTodo : function(key) {
			var todo = JSON.parse(localStorage.getItem(key));
			return todo;
		},
		/**
		 * todoを削除する.
		 * 
		 * @param {String} key 削除するキーID
		 */
		removeTodo : function(key) {
			localStorage.removeItem(key);
		},
		/**
		 * 全てのTODOを削除する.
		 */
		removeAllTodo : function() {
			localStorage.clear();
			localStorage.setItem(KEY_SEQ_TODO_STRAGE, '0');
		},
		/**
		 * 全てのTODOを取得する.
		 * 
		 * @returns key、limit、taskを持つオブジェクト配列
		 */
		getAllTodo : function() {
			var allTodo = [];
			for (var i = 0; i < localStorage.length; i++) {
				var key = localStorage.key(i);
				if (key === KEY_SEQ_TODO_STRAGE) {
					// シーケンスは除外
					continue;
				}
				allTodo.push(this.getTodo(key));
			}
			return allTodo;
		}
	};
	return logic;
})(window);
// TODOリストのコントローラを作成.
todolist.controller = (function(window) {
	'use strict';
	// ロジックのエイリアス
	var todoLogic = todolist.logic;
	/**
	 * DOM構造を作成するオブジェクト.
	 */
	var _tableManipulator = {

		/**
		 * 引数の文字列をHTMLエスケープする.
		 * 
		 * @memberOf todolist.controller._tableManipulator
		 */
		escapeHtml : function(str) {
			return $('<div>').text(str).html();
		},
		/**
		 * TODOテーブルのDOM構造を作成する.
		 * 
		 * @param {Array} todoList limit、taskを持つオブジェクト配列
		 */
		appendAllTodo : function(todoList) {
			var appendHtml = '<tbody id = "table-todolist">';
			for (var i = 0; i < todoList.length; i++) {
				var todo = todoList[i];
				appendHtml += this._buildTodoHtmlStr(i + 1, todo);
				this.maxNo = i + 1;
			}
			appendHtml += '</tbody>';
			$('#table-todolist').replaceWith(appendHtml);
		},

		/**
		 * TODOテーブルのDOM構造を作成する.
		 * 
		 * @param {Array} todoList limit、taskを持つオブジェクト配列
		 */
		appendTodo : function(todo) {
			var appendHtml = this._buildTodoHtmlStr($('#table-todolist').children().length + 1, todo);
			this.maxNo++;
			$('#table-todolist').append(appendHtml);
		},

		_buildTodoHtmlStr : function(no, todo) {
			var appendHtml = '<tr>';
			appendHtml += '<td>' + no + '</td>';
			appendHtml += '<td>' + this.escapeHtml(todo.limit) + '</td>';
			appendHtml += '<td>' + this.escapeHtml(todo.task) + '</td>';
			appendHtml += '<td><button id  ="btn-remove-todo-' + todo.key + '" class="btn-remove-todo">削除</button></td>';
			appendHtml += '</tr>';
			return appendHtml;
		}

	};
	// 公開するコントローラ
	var controller = {
		/**
		 * イベントハンドラの初期化を行う.
		 * 
		 * @memberOf todolist.controller
		 */
		initEventHandler : function() {
			// コントローラを一時変数に格納しイベントハンドラ内で利用できるようにしておく
			var self = this;
			$('#btn-regist').on('click', function() {
				console.time('start');
				var todo = {
					key : todoLogic.getNextId(),
					task : $('#form-regist-task').val(),
					limit : $('#form-regist-limit').val()
				};
				todoLogic.saveTodo(todo);
				_tableManipulator.appendTodo(todo);
				console.timeEnd('start');
				return false;
			});

			$(document).on('click', '.btn-remove-todo', function() {
				var $removeBtn = $(this);
				var todoId = $removeBtn.attr('id').replace('btn-remove-todo-', '');
				todoLogic.removeTodo(todoId);
				self.render();
				return false;
			});

			$('#btn-remove-all-todo').on('click', function() {
				todoLogic.removeAllTodo();
				self.render();
				return false;
			});
		},
		/**
		 * Todoリストのレンダリングを行う.
		 */
		render : function() {
			_tableManipulator.appendAllTodo(todoLogic.getAllTodo());
		}
	};
	return controller;
})(window);

$(function() {
	// 描画を行いその後にイベントハンドラの初期化
	todolist.controller.render();
	todolist.controller.initEventHandler();
});