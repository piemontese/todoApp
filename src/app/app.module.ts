import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
//import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { TodosService } from './todos/todos.service';
import { DialogComponent } from './todos/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
//    FlexLayoutModule.forRoot()
  ],
  entryComponents: [DialogComponent],
  providers: [TodosService],
  bootstrap: [AppComponent]
})
export class AppModule { }

