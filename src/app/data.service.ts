import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class DataService {
    // Observable string sources
  private todoListNameSource = new Subject<string>();
//  private todoListSource = new Subject<Array<string>>();

    // Observable string streams
  todoListName$ = this.todoListNameSource.asObservable();
//  todoList$ = this.todoListSource.asObservable();

  constructor() { }

  // Service message commands
  setTodoListName( todoListName: string ) {
    this.todoListNameSource.next(todoListName);
    console.log('DataService.setTodoListName = ' + todoListName);
  }
  /*
  saveTodoListName( todoList: Array<string>, todoListName: string ) {
    this.todoListNameSource.next(todoListName);
    localStorage.setItem(todoListName, JSON.stringify(todoList));
    console.log('DataService.setTodoListName = ' + todoList);
  }
  */
}
