import { Component, OnInit } from '@angular/core';
import { TestData } from 'src/app/data/Testdata';
import { Category } from 'src/app/models/Category';
import { Task } from 'src/app/models/Task';
import { DataHandlerService } from 'src/app/services/data-handler.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  // styleUrls: ['./tasks.component.css']
})


export class TasksComponent implements OnInit {

  detail = true;
  tasks: Task[] | undefined;

  constructor(private dataService: DataHandlerService) {
  }

  ngOnInit(): void {

    // Подписываемся на объект subject, внутри функция обратного вызова
    // также надо типизировать subject объект
    this.dataService.taskSubject.subscribe(v => {

      this.tasks = v;
      return console.log(v);

    });
    // throw new Error('Method not implemented.');
  }

  showDetail() {

    this.detail = !this.detail;
    console.log(this.detail);
  }



}
