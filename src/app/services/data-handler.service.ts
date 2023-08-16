import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { TestData } from '../data/Testdata';


@Injectable({
  providedIn: 'root'
})


export class DataHandlerService {

  constructor() { console.log("создался объект DataHandlerService") }

  getCategoryes(): Category[] {

    return TestData.categories;
  }


}
