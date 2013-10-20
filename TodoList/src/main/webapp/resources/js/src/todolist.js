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
            if (todo.task.length === 0 || todo.limit.length === 0) {
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
         * @returns ID
         */
        getNextId : function() {
            // 数値に変換できる文字列に対して+を頭に付けると数値に変換される。
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
            localStorage.setItem(todo.key, JSON.stringify(todo));
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
         * @returns {Array} key、limit、taskを持つオブジェクト配列
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
    var _tableManipulator = {

        /**
         * 引数の文字列をHTMLエスケープする.
         * 
         * @memberOf todolist._tableManipulator
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
            for ( var i = 0; i < todoList.length; i++) {
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
            var $todoTable = $('#table-todolist');
            var appendHtml = this._buildTodoHtmlStr($todoTable.children().length + 1, todo);
            $todoTable.append(appendHtml);
        },
        /**
         * TODOテーブルのナンバーを再描画する.
         */
        refleshTodoNo : function() {
            var $todoTable = $('#table-todolist');
            $todoTable.children().each(function(index) {
                $(this).find('.todo-no').text(index + 1);
            });
        },
        /**
         * TODO一つの要素HTML文字列を生成する.
         */
        _buildTodoHtmlStr : function(no, todo) {
            var appendHtml = '<tr id="todo-' + todo.key + '">';
            appendHtml += '<td class="todo-no">' + no + '</td>';
            appendHtml += '<td>' + this.escapeHtml(todo.limit) + '</td>';
            appendHtml += '<td>' + this.escapeHtml(todo.task) + '</td>';
            appendHtml += '<td><button id  ="btn-remove-todo-' + todo.key + '" class="btn-remove-todo btn btn-warning">削除</button></td>';
            appendHtml += '</tr>';
            return appendHtml;
        }
    };

    // TODOリストのコントローラを作成.
    todolist.controller = {

        /**
         * イベントハンドラの初期化を行う.
         * 
         * @memberOf todolist.controller
         */
        initEventHandler : function() {
            // コントローラを一時変数に格納しイベントハンドラ内で利用できるようにしておく
            var self = this;
            $('#btn-regist').on('click', function() {
                var todo = {
                    key : todolist.logic.getNextId(),
                    task : $('#form-regist-task').val(),
                    limit : $('#form-regist-limit').val()
                };
                if (!todolist.validator.validate(todo)) {
                    return true;
                }
                todolist.logic.saveTodo(todo);
                _tableManipulator.appendTodo(todo);
                return false;
            });

            $(document).on('click', '.btn-remove-todo', function() {
                var $removeBtn = $(this);
                var todoId = $removeBtn.attr('id').replace('btn-remove-todo-', '');
                todolist.logic.removeTodo(todoId);
                $('#todo-' + todoId).remove();
                _tableManipulator.refleshTodoNo();
                return false;
            });

            $('#btn-remove-all-todo').on('click', function() {
                todolist.logic.removeAllTodo();
                self.render();
                return false;
            });
        },
        /**
         * Todoリストのレンダリングを行う.
         */
        render : function() {
            _tableManipulator.appendAllTodo(todolist.logic.getAllTodo());
        }
    };
    window.todolist = todolist;
})(window);

$(function() {
    'use strict';
    // 描画を行いその後にイベントハンドラの初期化
    todolist.controller.render();
    todolist.controller.initEventHandler();
});