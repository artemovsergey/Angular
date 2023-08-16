import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { DataHandlerService } from 'src/app/services/data-handler.service';

@Component({
  selector: 'app-categoryes',
  templateUrl: './categoryes.component.html',
  styleUrls: ['./categoryes.component.css']
})

export class CategoryesComponent implements OnInit {
  
  categories: Category[] | undefined;

  constructor(private dataService: DataHandlerService){
    console.log("constructor component categoryes");
    this.categories = this.dataService.getCategoryes();
    console.log(this.categories);
  }
  
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    console.log("init component categoryes");

  }

}
