import { Injectable }      from '@angular/core';
//import { Http }            from '@angular/core';
import { Observable }      from 'rxjs/Observable';
import { Subject }         from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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
    let savedTodos = [];
    for (var key in localStorage){
      savedTodos.push(key);
    }
    console.log('TodosService.savedTodos: ' + savedTodos);
    this.savedTodosSource.next(JSON.stringify(savedTodos));
  }
  
  deleteTodo( i: number ) {
    /*
    this.todoList.splice(i, 1);
    if ( this.todoList.length === 0 ) this.todoList = null;
    console.log('TodosService.todoList: ' +  this.todoList);
    console.log(i);
    */
  }

/*
  saveTodoListName( todoList: Array<string>, todoListName: string ) {
    this.todoListNameSource.next(todoListName);
    localStorage.setItem(todoListName, JSON.stringify(todoList));
    console.log('DataService.setTodoListName = ' + todoList);
  }
  */
}
