import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Task } from 'src/app/models/Task';
import { DataHandlerService } from 'src/app/services/data-handler.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})


export class TasksComponent implements OnInit {

  tasks: Task[] | undefined;

  constructor(private dataService: DataHandlerService) {

    this.tasks = this.dataService.getTasks();

  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }



}
