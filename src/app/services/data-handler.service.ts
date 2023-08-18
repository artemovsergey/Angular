import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { TestData } from '../data/Testdata';
import { Task } from '../models/Task';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class DataHandlerService {

  taskSubject = new Subject<Task[]>();

  constructor() { console.log("создался объект DataHandlerService") }


  // Получение всех категорий
  getCategoryes(): Category[] {

    return TestData.categories;
  }


  // Обновление задач или наблюдение за коллекцией задач

  updateTasks() {

    this.taskSubject.next(TestData.tasks);

    // return TestData.tasks;
  }

  updateTasksbyCategory(category: Category) {

    // console.log(TestData.tasks.filter(task => task.category === category));
    const tasks = TestData.tasks.filter(task => task.category === category);

    // уведомляем наблюдателей или подписчиков, что произошли изменения с объектом tasks
    this.taskSubject.next(tasks);

  }



}
