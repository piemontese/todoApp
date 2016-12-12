import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { TodosService, Todo } from './todos.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  /*
  todo = {
    type: 'Todo',
    checked: false,
    text:  ''
  };
  */
  todo : Todo = new Todo;
//  todoList = Array();
  todoList : Todo[];
  savedTodos = [];
  todoListName: string = '';
  isDarkTheme: boolean = false;
  dialogResult: string;
//  dialogRef: MdDialogRef<DialogComponent>;

  model = this.todo;
  /*
  todoList = [ { checked: false, text: 'todo 1' },
               { checked: false, text: 'todo 2' },
               { checked: false, text: 'todo 3' },
               { checked: false, text: 'todo 4' } ];
  */

  constructor( private dialog: MdDialog/*, private config: MdDialogConfig*/, private todosService: TodosService ) {
    todosService.todoListName$.subscribe(
      todoListName => {
        this.todoListName = `${todoListName}`;
        console.log('TodosComponent.todoListName = ' + this.todoListName);
      });

    todosService.todoList$.subscribe(
      todoList => {
        this.todoList = [];
        this.todoList = JSON.parse(`${todoList}`);
        console.log('TodosComponent.todoList = ' + this.todoList);
      });

    todosService.savedTodos$.subscribe(
      savedTodos => {
        this.savedTodos = JSON.parse(`${savedTodos}`);
        console.log('TodosComponent.savedTodos = ' + this.savedTodos);
      });

    /*
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
       this.savedTodos.push(localStorage.getItem( localStorage.key( i ) ));
    }
    */
    /*this.savedTodos = */this.todosService.getSavedTodos();
    this.todoList = JSON.parse(localStorage.getItem(this.todoListName));
    console.log(localStorage.getItem(this.todoListName));
    console.log(this.todoList);
  }

  addTodo( /*text: string*/ ) {
    let todo = { type: this.todo.type, checked: false, text: this.model.text };
    if ( !this.todoList ) this.todoList = [];
    this.todoList.push(todo);
    console.log(this.todoList);
    console.log(this.model);
    this.model.text = '';
  }

  deleteTodo( i: number ) {
    this.todoList.splice(i, 1);
    if ( this.todoList.length === 0 ) this.todoList = null;
    console.log(this.todoList);
    console.log(i);
  }

  createTodos() {
    this.todoList = null; //[];
    this.todoListName = '';
  }

  saveTodos() {
//    $('#saveDialog').modal();
    this.todosService.setTodoListName(this.todoListName);
    console.log('todoListName: ' + this.todoListName);
    this.openDialog();
/*
    if ( this.todoList && this.todoListName !== '' ) {
      localStorage.setItem(this.todoListName, JSON.stringify(this.todoList));
      console.log('todoListName: ' + this.todoListName);
      console.log('todoListName: ' + JSON.parse(localStorage.getItem(this.todoListName)));
      this.todosService.getSavedTodos();
    }
*/
  }

  deleteTodos() {
    localStorage.removeItem(this.todoListName);
    /*this.savedTodos = */this.todosService.getSavedTodos();
    this.createTodos();
  }

  selectTodos( key: string ) {
    this.todoListName = key;
    this.todoList = JSON.parse(localStorage.getItem(this.todoListName));
    console.log('selectTodos: ' + key);
    console.log(this.todoList);
    console.log(this.todoListName);
  }

  openDialog() {
    this.todosService.setTodoListName(this.todoListName);
    let dialogRef = this.dialog.open(DialogComponent, {
      disableClose: false//,
//      width: "40%"
    });

    /*
    dialogRef.afterClosed().subscribe(result => {
      this.lastDialogResult = result;
      console.log("DialogComponent closed: " + result);
    })
    */
    /*
    this.dialog.open(DialogComponent, this.config)
         .then(res => {
            this.dialogRef = res;
            this.dialogRef.componentInstance.title = 'Title';
//            this.dialogRef.componentInstance.contents = contents;
         });
    */
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog result: ' + result);
      if ( result !== '' ) {
        localStorage.setItem(this.todoListName, JSON.stringify(this.todoList));
        console.log('todoListName: ' + this.todoListName);
        console.log('todoListName: ' + JSON.parse(localStorage.getItem(this.todoListName)));
        this.todosService.getSavedTodos();
      }
//      close(result);
//      this.dialogRef = null;
    });
  }

  checkboxClick( i: number ) {
    this.todoList[i].checked = true;
    console.log("checkBox(" + i + ") clicked");
  }

  ngOnInit( ) {
    console.log(this.todoList);
  }
}


