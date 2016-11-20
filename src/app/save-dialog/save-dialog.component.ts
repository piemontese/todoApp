import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription }   from 'rxjs/Subscription';
import { Todo } from '../todo';

@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
styleUrls: ['./save-dialog.component.css']
})
export class SaveDialogComponent implements OnInit {
  @Input() todoListName: string = '';
  subscription: Subscription;
  todoList = Array();

  model = new Todo(); 

  constructor( private dataService: DataService ) { 
    this.subscription = dataService.todoListName$.subscribe(
      todoListName => {
        this.todoListName = todoListName;
        console.log('SaveDialog.todoListName = ' + this.todoListName);
    });
    /*
    this.subscription = dataService.todoList$.subscribe(
      todoList => {
        this.todoList = todoList;
        console.log('SaveDialog.todoList = ' + this.todoList);
    });
    */
  }
  
  show() { 
  }

  cancelClick() { 
    console.log("Cancel");
  }

  okClick() { 
    console.log("OK");
    this.dataService.setTodoListName(this.model.todoListName);
  }

  ngOnInit() {
  }

}
