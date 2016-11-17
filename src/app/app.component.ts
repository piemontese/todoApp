import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Todo } from './todo';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  todoList = Array();
  savedTodos = Array();
  todoListName: string = '';
  isDarkTheme: boolean = false;
  lastDialogResult: string;
  
  model = new Todo(); 
  /*
  todoList = [ { checked: false, text: 'todo 1' },
               { checked: false, text: 'todo 2' },
               { checked: false, text: 'todo 3' },
               { checked: false, text: 'todo 4' } ];
  */
 
  constructor( private _dialog: MdDialog ) {
    /*
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
       this.savedTodos.push(localStorage.getItem( localStorage.key( i ) ));
    }
    */
    this.getSavedTodos();
    this.todoList = JSON.parse(localStorage.getItem(this.todoListName));
    console.log(localStorage.getItem(this.todoListName));
    console.log(this.todoList);
  }  
  
  private getSavedTodos() {
    this.savedTodos = [];
    for (var key in localStorage){
       this.savedTodos.push(key);
    }
  }  
  
  addTodo( /*text: string*/ ) {
    let todo = { checked: false, text: this.model.inputTodo };    
    if ( !this.todoList ) this.todoList = [];
    this.todoList.push(todo);
    console.log(this.todoList);
    console.log(this.model);
    this.model.inputTodo = '';
  }    
  
  deleteTodo( i: number ) {
    this.todoList.splice(i, 1);
    console.log(this.todoList);
    console.log(i);
  }  
  
  saveTodos() {
    $('#saveDialog').modal();
//    this.openDialog();
  if ( this.todoList ) {
      localStorage.setItem(this.todoListName, JSON.stringify(this.todoList));
      console.log('todoListName:' + JSON.parse(localStorage.getItem(this.todoListName)));
      this.getSavedTodos();
    }  
  }  
  
  deleteTodos() {
    localStorage.removeItem(this.todoListName);
    this.getSavedTodos();
  }  
  
  selectTodos( key: string ) {
    this.todoListName = key;
    this.todoList = JSON.parse(localStorage.getItem(this.todoListName));
    //this.getSavedTodos();
    console.log('selectTodos: ' + key);
    console.log(this.todoList);
    console.log(this.todoListName);
  }  
  
  openDialog() {
    let dialogRef = this._dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.lastDialogResult = result;
      console.log("DialogComponent closed");
    })
  }

  ngOnInit( ) {
    console.log(this.todoList);
  }  
}
