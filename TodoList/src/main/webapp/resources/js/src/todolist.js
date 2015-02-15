(function(window) {
    'use strict';
    // キーのシーケンス用
    var KEY_SEQ_TODO_STRAGE = 'key.seq.todo.strage';
    /**
     * 名前空間
     * 
     * @namespace todoList
     */
    var todolist = {};
    // ローカルストレージにシーケンスをセット
    if (localStorage.getItem(KEY_SEQ_TODO_STRAGE) === undefined) {
        localStorage.setItem(KEY_SEQ_TODO_STRAGE, '0');
    }
    todolist.validator = {
        /**
         * todoのチェックを行う.
         * 
         * @memberOf todolist.validator
         * @param {Object} todo todoオブジェクト
         */
        validate : function(todo) {
            if (todo.task.length === 0 || todo.deadline.length === 0) {
                return false;
            }
            return true;
        }
    };
    // todoリストのビジネスロジックの作成.
    todolist.logic = {
        /**
         * シーケンスキー.
         */
        seqKey : KEY_SEQ_TODO_STRAGE,
        /**
         * シーケンスのIDを取得する
         * 
         * @memberOf todolist.logic
         * @returns ID
         */
        getNextId : function() {
            // 数値に変換できる文字列に対して+を頭に付けると数値に変換される。
            var id = +localStorage.getItem(KEY_SEQ_TODO_STRAGE);
            localStorage.setItem(KEY_SEQ_TODO_STRAGE, id + 1);
            return id;
        },
        /**
         * 引数のtodoを保存する。todoのプロパティは期限(deadline)とタスク内容(task)
         * 
         * @memberOf todolist.logic
         * @param {Object} todo key、deadline、taskを持つプロパティ
         */
        saveTodo : function(todo) {
            localStorage.setItem(todo.key, JSON.stringify(todo));
        },
        /**
         * todoを取得する.
         * 
         * @memberOf todolist.logic
         * @param {String} 取得するキーID
         * @returns {Object} key、deadline、taskを持つオブジェクト.
         */
        getTodo : function(key) {
            var todo = JSON.parse(localStorage.getItem(key));
            return todo;
        },
        /**
         * todoを削除する.
         * 
         * @memberOf todolist.logic
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
         * @memberOf todolist.logic
         * @returns {Array} key、deadline、taskを持つオブジェクト配列
         */
        getAllTodo : function() {
            var allTodo = [];
            for ( var i = 0; i < localStorage.length; i++) {
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

    /**
     * DOM構造を作成するオブジェクト.
     */
    todolist.view = {

        /**
         * 引数の文字列をHTMLエスケープする.
         * 
         * @memberOf todolist.view
         */
        escapeHtml : function(str) {
            return $('<div>').text(str).html();
        },
        /**
         * TODOテーブルのDOM構造を作成する.
         * 
         * @memberOf todolist.view
         * @param {Array} todoList deadline、taskを持つオブジェクト配列
         */
        appendAllTodo : function(todoList) {
            var appendHtml = '<tbody id = "table-todolist">';
            for ( var i = 0; i < todoList.length; i++) {
                var todo = todoList[i];
                appendHtml += this._buildTodoHtmlStr(i + 1, todo);
            }
            appendHtml += '</tbody>';
            $('#table-todolist').replaceWith(appendHtml);
        },

        /**
         * TODOテーブルのDOM構造を作成する.
         * 
         * @memberOf todolist.view
         * @param {Array} todoList deadline、taskを持つオブジェクト配列
         */
        appendTodo : function(todo) {
            var $todoTable = $('#table-todolist');
            var appendHtml = this._buildTodoHtmlStr($todoTable.children().length + 1, todo);
            $todoTable.append(appendHtml);
        },
        /**
         * TODOテーブルのナンバーを再描画する.
         * 
         * @memberOf todolist.view
         */
        refleshTodoNo : function() {
            var $todoTable = $('#table-todolist');
            $todoTable.children().each(function(index) {
                $(this).find('.todo-no').text(index + 1);
            });
        },

        /**
         * TODO一つの要素HTML文字列を生成する.
         * 
         * @private
         * @memberOf todolist.view
         */
        _buildTodoHtmlStr : function(no, todo) {
            var appendHtml = '<tr id="todo-' + todo.key + '">';
            appendHtml += '<td class="todo-no">' + no + '</td>';
            appendHtml += '<td>' + this.escapeHtml(todo.deadline) + '</td>';
            appendHtml += '<td>' + this.escapeHtml(todo.task) + '</td>';
            appendHtml += '<td><button id  ="btn-remove-todo-' + todo.key
                    + '" class="btn-remove-todo btn btn-warning">削除</button></td>';
            appendHtml += '</tr>';
            return appendHtml;
        }
    };

    // TODOリストのコントローラを作成.
    todolist.controller = {
        /**
         * 登録ボタン押下時のイベントハンドラメソッド.
         * 
         * @memberOf todolist.controller
         * @returns {Boolean} 遷移するか
         */
        '#btn-regist click' : function() {
            var todo = {
                key : todolist.logic.getNextId(),
                task : $('#form-regist-task').val(),
                deadline : $('#form-regist-deadline').val()
            };
            if (!todolist.validator.validate(todo)) {
                return true;
            }
            todolist.logic.saveTodo(todo);
            todolist.view.appendTodo(todo);
            return false;
        },
        /**
         * 削除ボタン押下時のイベントハンドラメソッド.
         * 
         * @memberOf todolist.controller
         * @returns {Boolean} 遷移するかどうか
         */
        'document .btn-remove-todo click' : function() {
            var $removeBtn = $(this);
            var todoId = $removeBtn.attr('id').replace('btn-remove-todo-', '');
            todolist.logic.removeTodo(todoId);
            $('#todo-' + todoId).remove();
            todolist.view.refleshTodoNo();
            return false;
        },
        /**
         * 全削除ボタンのイベントハンドラメソッド.
         * 
         * @memberOf todolist.controller
         * @returns {Boolean} 遷移するかどうか
         */
        '#btn-remove-all-todo click' : function() {
            todolist.logic.removeAllTodo();
            todolist.view.appendAllTodo(todolist.logic.getAllTodo());
            return false;
        },

        /**
         * イベントハンドラの初期化を行う.
         * 
         * @memberOf todolist.controller
         */
        initEventHandler : function() {
            // コントローラを一時変数に格納しイベントハンドラ内で利用できるようにしておく
            $('#btn-regist').on('click', this['#btn-regist click']);
            $(document).on('click', '.btn-remove-todo', this['document .btn-remove-todo click']);
            $('#btn-remove-all-todo').on('click', this['#btn-remove-all-todo click']);
        },
        /**
         * 画面の初期化を行なう.
         * 
         * @memberOf todolist.controller
         */
        initDisplay : function() {
            todolist.view.appendAllTodo(todolist.logic.getAllTodo());
        }

    };
    // グローバル変数に紐付け。紐付方法はプロダクトコードのようににwidowのプロパティにするか以下のように即時関数のリターンする方法がある。
    // var global = (function() {
    // var obj = {};
    // return obj;
    // })();
    window.todolist = todolist;
})(window);
$(function() {
    'use strict';
    todolist.controller.initDisplay();
    todolist.controller.initEventHandler();
});
