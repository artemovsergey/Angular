import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PriorityesComponent } from './components/priorityes/priorityes.component';
import { CategoryesComponent } from './components/categoryes/categoryes.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryesComponent,
    PriorityesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
