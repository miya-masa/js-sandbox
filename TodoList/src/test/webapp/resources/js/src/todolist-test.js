describe('todoロジック、', function() {
    'use strict';
    var target = todolist.logic;
    beforeEach(function() {
        localStorage.clear();
    });
    it('getNextIdでシーケンスを取得する。', function() {
        // 準備
        // 実行
        var actualSeq1 = target.getNextId();
        var actualSeq2 = target.getNextId();
        // 検証
        expect(actualSeq1).toEqual(0);
        expect(actualSeq2).toEqual(1);
    });
    it('saveTodoでtodoを保存する。', function() {
        // 準備
        var todo = {
            key : 0,
            limit : '2013/01/01',
            task : 'タスク'
        };
        // 実行
        target.saveTodo(todo);
        // 検証
        var verify = localStorage.getItem('0');
        expect(verify).toEqual(JSON.stringify(todo));
    });

    it('getTodoでtodoを取得する', function() {
        // 準備
        var obj = {
            hoge : 'hoge'
        };
        localStorage.setItem('key', JSON.stringify(obj));
        // 実行
        var actual = target.getTodo('key');
        // 検証
        expect(actual).toEqual(obj);
    });

    it('removeTodoでtodoを削除する。', function() {
        // 準備
        localStorage.setItem('key1', 'hoge');
        localStorage.setItem('key2', 'hogehoge');
        // 実行
        target.removeTodo('key1');
        // 検証
        expect(localStorage.getItem('key1')).toBeNull();
        expect(localStorage.getItem('key2')).toEqual('hogehoge');
    });

    it('removeAllTodoですべてのTODOを削除し、シーケンスもリセットする。', function() {
        // 準備
        localStorage.setItem('key1', 'hoge');
        localStorage.setItem('key2', 'hoge');
        // 実行
        target.removeAllTodo();
        // 検証
        expect(localStorage.getItem('key1')).toBeNull();
        expect(localStorage.getItem('key2')).toBeNull();
        expect(localStorage.getItem(target.seqKey)).toEqual('0');
    });
});

describe('todoコントローラの初期表示機能、', function() {
    'use strict';
    var target = todolist.controller;
    beforeEach(function() {
        setFixtures('<button id = "btn-regist"></button>');
    });
    it('initEventHandlerで登録ボタンにイベントをバインドする。', function() {
        var spyObj = jasmine.createSpyObj('mock', [ 'on' ]);
        var dummyObj = jasmine.createSpyObj('mock', [ 'on' ]);
        spyOn(window, '$').andCallFake(function(args) {
            if (args === '#btn-regist') {
                return spyObj;
            }
            return dummyObj;
        });

        target.initEventHandler();

        expect($).toHaveBeenCalledWith('#btn-regist');
        expect(spyObj.on).toHaveBeenCalledWith('click', jasmine.any(Function));
    });

    it('initEventHandlerで削除ボタンにイベントをバインドする。', function() {
        var spyObj = jasmine.createSpyObj('mock', [ 'on' ]);
        var dummyObj = jasmine.createSpyObj('mock', [ 'on' ]);
        spyOn(window, '$').andCallFake(function(args) {
            if (args === document) {
                return spyObj;
            }
            return dummyObj;
        });

        target.initEventHandler();

        expect($).toHaveBeenCalledWith(document);
        expect(spyObj.on).toHaveBeenCalledWith('click', '.btn-remove-todo', jasmine.any(Function));
    });

    it('initEventHandlerで全削除ボタンにイベントをバインドする。', function() {
        var spyObj = jasmine.createSpyObj('mock', [ 'on' ]);
        var dummyObj = jasmine.createSpyObj('mock', [ 'on' ]);
        spyOn(window, '$').andCallFake(function(args) {
            if (args === '#btn-remove-all-todo') {
                return spyObj;
            }
            return dummyObj;
        });

        target.initEventHandler();

        expect($).toHaveBeenCalledWith('#btn-remove-all-todo');
        expect(spyObj.on).toHaveBeenCalledWith('click', jasmine.any(Function));
    });

});