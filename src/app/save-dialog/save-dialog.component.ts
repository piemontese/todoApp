import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.css']
})
export class SaveDialogComponent implements OnInit {
  @Input() todoListName: string = '';

  model = new Todo(); 

  constructor() { }
  
  show() { 
  }

  cancelClick() { 
    console.log("Cancel");
  }

  okClick() { 
    console.log("OK");
  }

  ngOnInit() {
  }

}
