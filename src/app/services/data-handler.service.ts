import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { TestData } from '../data/Testdata';
import { Task } from '../models/Task';


@Injectable({
  providedIn: 'root'
})


export class DataHandlerService {

  constructor() { console.log("создался объект DataHandlerService") }

  getCategoryes(): Category[] {

    return TestData.categories;
  }

  getTasks(): Task[] {

    return TestData.tasks;
  }

  getTaskByCategory(category: Category): Task[] {

    console.log(TestData.tasks.filter(task => task.category === category));
    return TestData.tasks.filter(task => task.category === category);
  
  }



}
