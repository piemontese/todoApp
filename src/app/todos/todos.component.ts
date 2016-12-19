import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { TodosService, Todo } from './todos.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  providers: [MdSnackBar]
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
  snackBarConfig: MdSnackBarConfig;
//  dialogRef: MdDialogRef<DialogComponent>;

  model = this.todo;
  /*
  todoList = [ { checked: false, text: 'todo 1' },
               { checked: false, text: 'todo 2' },
               { checked: false, text: 'todo 3' },
               { checked: false, text: 'todo 4' } ];
  */

  constructor( private dialog: MdDialog, private snackBar: MdSnackBar, private todosService: TodosService ) {
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

    this.snackBarConfig = new MdSnackBarConfig();
    this.snackBarConfig.duration = 2000;

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

  addTodo() {
    if ( this.todoList )
      for (var i = 0; i < this.todoList.length; i++) {
        if ( this.todoList[i].text == this.model.text ) {
          this.snackBar.open('Todo already in list', '', this.snackBarConfig);
          return;
        }
      }
    let todo = { type: this.todo.type, checked: false, text: this.model.text };
    if ( !this.todoList ) this.todoList = [];
    this.todoList.push(todo);
    this.model.text = '';
  }

  deleteTodo( i: number ) {
    this.todosService.deleteTodo(i, this.todoList);
  }

  createTodos() {
    this.todoList = null; //[];
    this.todoListName = '';
  }

  saveTodos() {
//    $('#saveDialog').modal();
    this.todosService.setTodoListName(this.todoListName);
    console.log('todoListName: ' + this.todoListName);
    if ( this.todoListName === '' )
      this.openDialog();
    else {
      this.todosService.saveTodos(this.todoListName, this.todoList);
      this.snackBar.open('Todo list "' + this.todoListName + '" saved', '', this.snackBarConfig);
    }
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
      disableClose: false,
      width: "30%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog result: ' + result);
      if ( result !== '' ) {
        this.todosService.saveTodos(this.todoListName, this.todoList);
        this.snackBar.open('Todo list "' + this.todoListName + '" saved', '', this.snackBarConfig);
      }
    });
  }

  checkboxClick( i: number ) {
    //this.todoList[i].checked = this.model.checked;
    console.log("checkBox(" + i + ") = " + this.todoList[i].checked);
  }

  ngOnInit( ) {
    console.log(this.todoList);
  }
}


