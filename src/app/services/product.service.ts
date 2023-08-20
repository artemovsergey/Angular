import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { Product } from '../models/Product';


@Injectable({
  providedIn: 'root'
})


export class ProductService {

  constructor(private http: HttpClient) { }


  getAll() : Observable<Product[]>{
    return this.http.get<Product[]>("https://fakestoreapi.com/products" );
  }
}
  