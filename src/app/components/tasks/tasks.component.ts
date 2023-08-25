import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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

  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  dataSource: MatTableDataSource<Task>;

  detail = true;
  tasks: Task[];

  constructor(private dataService: DataHandlerService) {

  
  }

  ngOnInit(): void {

   

    // Подписываемся на объект subject, внутри функция обратного вызова
    // также надо типизировать subject объект
    this.dataService.taskSubject.subscribe(v => {

      this.tasks = v;
      console.log(this.tasks);

    });

    this.dataSource = new MatTableDataSource();
    this.refreshTable();

  }

  showDetail() {

    this.detail = !this.detail;
    console.log(this.detail);
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }

  getPriorityColor(task: Task) {
    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return '#fff';
  }

  refreshTable() {
    this.dataSource.data = TestData.tasks;  //this.tasks;
    console.log(this.dataSource.data);
  }



}
