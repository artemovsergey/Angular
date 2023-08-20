import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Subject } from 'rxjs';
import { Product } from './models/Product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {

  products : Product[];

  constructor(private productService: ProductService) {

  }

  // делать запрос к сервису хорошо делать в момент инициализации компонентов
  ngOnInit(): void {
    // конструкция getAll возвращает Stream, значит мы можем подписаться.
    this.productService.getAll().subscribe(p => {  this.products = p  });
  }


  title = 'angularapp1';

}
