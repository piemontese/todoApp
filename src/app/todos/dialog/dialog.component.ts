import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { TodosService } from '../todos.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
//  providers: [TodosService]
})
export class DialogComponent implements OnInit, OnDestroy {
  // @Input() todoListName: string = '';
  // todoListName: string = '';
  subscription: Subscription;
  todoList = Array();

//  model = this.todoListName;
  model: string = '';

  constructor( public dialogRef: MdDialogRef<DialogComponent>, private todosService: TodosService ) {
    this.subscription = todosService.todoListName$.subscribe(
      todoListName => {
//        this.todoListName = todoListName;
        this.model = todoListName;
        console.log('Dialog.todoListName = ' + this.model);
    });
    /*
    this.subscription = todosService.todoList$.subscribe(
      todoList => {
        this.todoList = todoList;
        console.log('SaveDialog.todoList = ' + this.todoList);
    });
    */
  }

  show() {
  }

  cancelClick() {
    console.log('Cancel');
    console.log('Dialog.todoListName = ' + this.model);
    this.dialogRef.close('');
  }

  okClick() {
    console.log('OK');
    this.todosService.setTodoListName(this.model);
    console.log('Dialog.todoListName = ' + this.model);
    if ( this.model !== '' ) {
      this.dialogRef.close(this.model);
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
