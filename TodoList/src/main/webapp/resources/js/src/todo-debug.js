todolist.debug = {
    testRegistPerformance : function() {
        console.time('regist');
        for ( var i = 0; i < 1000; i++) {
            $('#form-regist-limit').val('2013-10-19');
            $('#form-regist-task').val('タスク' + i);
            $('#btn-regist').click();
        }
        console.timeEnd('regist');
    },

    testRemovePerformance : function() {
        var allTodo = todolist.logic.getAllTodo();
        console.time('remove');
        for ( var i = 0; i < allTodo.length; i++) {
            $('#btn-remove-todo-' + allTodo[i].key).click();
        }
        console.timeEnd('remove');
    }
};
$(function() {
    todolist.debug.testRegistPerformance();
    todolist.debug.testRemovePerformance();
});