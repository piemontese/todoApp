import { Component, OnInit, Optional } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Todo } from '../todo';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  model = new Todo(); 

  constructor( @Optional() public dialogRef: MdDialogRef<DialogComponent> ) { }
  
  ngOnInit() {
  }

}
