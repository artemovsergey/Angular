import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CategoryesComponent } from './components/categoryes/categoryes.component';
import { TasksComponent } from './components/tasks/tasks.component';

import { HttpClientModule } from '@angular/common/http';

import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    CategoryesComponent,

    TasksComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatTableModule,
    MatSortModule,
    MatPaginatorModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
