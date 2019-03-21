import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

export class Todo {
  checked: boolean;
  text: string;
  type: 'Todo';
}

@Injectable()
export class TodosService {
    // Observable string sources
  private todoListNameSource = new Subject<string>();
  private todoListSource = new Subject<Todo[]>();
  private savedTodosSource = new Subject<string>();

    // Observable string streams
  todoListName$ = this.todoListNameSource.asObservable();
  todoList$ = this.todoListSource.asObservable();
  savedTodos$ = this.savedTodosSource.asObservable();

  constructor() { }

  // Service message commands
  setTodoListName( todoListName: string ) {
    this.todoListNameSource.next(todoListName);
    console.log('TodosService.setTodoListName = ' + todoListName);
  }

  /**
    Get saved todo lists
   */
  getSavedTodos() {
    const savedTodos = [];
    for ( const key in localStorage ) {
      /*
      let notFound = true;
      let array = JSON.parse(localStorage.getItem(key));
      for (var i = 0; i < array.length; i++) {
        if ( array[i].type != "Todo" ) {
          notFound = true;
          break;
        }
      }
      if ( notFound == false )
      */
        savedTodos.push(key);
    }
    console.log('TodosService.savedTodos: ' + savedTodos);
    this.savedTodosSource.next(JSON.stringify(savedTodos));
  }

  saveTodos( todoListName: string, todoList: Todo[] ) {
    if ( todoList && todoListName !== '' ) {
      localStorage.setItem(todoListName, JSON.stringify(todoList));
      console.log('TodoService.todoListName: ' + todoListName);
      console.log('TodoService.todoList: ' + JSON.parse(localStorage.getItem(todoListName)));
      this.getSavedTodos();
    }
  }

  deleteTodo( i: number, todoList: Todo[] ) {
    todoList.splice(i, 1);
    if ( todoList.length === 0 ) { todoList = null; }
    console.log(todoList);
    console.log(i);
  }

/*
  saveTodoListName( todoList: Array<string>, todoListName: string ) {
    this.todoListNameSource.next(todoListName);
    localStorage.setItem(todoListName, JSON.stringify(todoList));
    console.log('DataService.setTodoListName = ' + todoList);
  }
  */
}
