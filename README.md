# Технический журнал Angular

- angular рекомендует работать через автономные компоненты
- можно работать через модули

Замечание: при создании проекта через VS по умолчанию используются модули, при создании через ng new используются автономные компоненты


# Создание проекта

```cmd
ng new nameapp --skip-tests
ng new nameapp --directory SportsStore/ClientApp --routing true --style css --skip-tests true --skip-git true
```

## Binding

- {{title}}
- [value]="title"
- [{ngModel}="title"]

Замечание: imports:[FormsModule] для двусторонней привязки

# Binding style
```
<h1 [style.font-size]="count+'px'"> {{title}}</h1>
```

# Binding class
```
<button [class]="enable ? 'newclass' : 'oldclass'"
        (click)="increase()">
        Нажать
</button>
```


# Компоненты

```
ng g c namecomponent --skip-tests  --module=app
```
опция --flat, которая указывает CLI генерировать новые файлы в текущей папке

Компонент ts
```
ng generate component BaseForm --skip-import --skip-tests --inline-template
--inline-style --flat
```



# Роутер

```ts
// определение маршрутов
const routes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', redirectTo: '/about', pathMatch:'full'}, // переадресация c полным соответствием
  { path: '**', component: HomeComponent } // если не подходит все маршруты
];
```

чтобы можно было внедрить в AppComponent тот компонент, который обрабатывает запрос, необходимо использовать элемент RouterOutlet. Для этого изменим код AppComponent:


```html
<a routerLink=""
   routerLinkActive="active" <!-- active class css -->
   [routerLinkActiveOptions]="{exact:true}"
   >
   Go to Home
</a>
```

Значение ```{exact:true}``` указывает на то, что для установки активной ссылки будет применяться полное соответствие:

# Развертывание

- php hosting
- github pages

# Font-Awesome

```
npm install font-awesome
```

# Bootstrap

```
ng add ngx-bootstrap
```

# Http Get

```Typescript
export class AppComponent implements OnInit {

  title = "client";
  users: any;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.http.get('http://localhost:5058/api/users').subscribe({
      next: response => this.users = response,
      error: error => console.log(error)
    })
  }
}
```

# RxJs и Observable

Самое важное различие между методами Observable и операторами RxJS заключается в том, что последние
всегда возвращает Observables, в то время как первый возвращает другой (и в основном конечный) тип объекта. Вам не напоминает
это вам ничего не напоминает?
Если вспомнить, что мы изучали в главе 6, "Получение и отображение данных", при работе с
.NET Entity Framework, то это должно показаться знакомым. Помните, как мы играли с
с интерфейсом IQueryable<T>? Различные методы Where, OrderBy и CountAsync IQueryable
которые мы использовали при создании нашего класса ApiResult, очень похожи на то, что мы можем сделать в Angular с помощью
соединяя несколько функций map с помощью оператора pipe. И наоборот, метод subscribe() строго
строго напоминает различные методы ToListAsync()/ToArrayAsync(), которые мы использовали в .NET для выполнения
IQueryable и получения его результата в виде удобного объекта.

# Dto

Как следует из названия, DTO - это объект, который переносит данные между процессами. Это широко
широко используется при разработке веб-сервисов и микросервисов, где каждый HTTP-вызов
является дорогостоящей операцией, которая всегда должна быть сокращена до минимального количества
необходимых данных.
Разница между DTO и бизнес-объектами и/или объектами доступа к данным (такими как
DataSets, DataTables, DataRows, IQueryables и Entities) в том, что DTO должен только хранить,
сериализовывать и десериализовывать только свои собственные данные.


# ProxyConf

```js
const PROXY_CONFIG = [
  {
    context: [
      "/api",
    ],
    target: "https://localhost:7068",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
```

# enviroment.prod.ts

```Cshar
export const environment = {
  production: false,
  // baseUrl: "https://localhost:7068/"
  baseUrl: "/"
};
```

# AppRoutingModule

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UserEditComponent } from './components/user-edit/user-edit.component'
import { RoleEditComponent } from './components/role-edit/role-edit.component';

const routes: Routes = [
  { path: '', component: UsersComponent, pathMatch: 'full' },
  { path: 'user/:id', component: UserEditComponent },
  { path: 'users', component: UsersComponent, pathMatch: 'full' },
  { path: 'user', component: UserEditComponent },
  { path: 'roles/:id', component: RoleEditComponent },
  { path: 'role', component: RoleEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

```html
<router-outlet></router-outlet>
```

# AngularMaterialModule

```ts
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatTableModule } from '@angular/material/table';

import { MatPaginatorModule } from '@angular/material/paginator';

import { MatSortModule } from '@angular/material/sort';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
 imports: [
   MatButtonModule,
   MatIconModule,
   MatToolbarModule,
   MatPaginatorModule,
   MatTableModule,
   MatSortModule,
   MatInputModule,
   MatSelectModule
 ],
 exports: [
   MatButtonModule,
   MatIconModule,
   MatToolbarModule,
   MatPaginatorModule,
   MatTableModule,
   MatSortModule,
   MatInputModule,
   MatSelectModule
 ]
})
export class AngularMaterialModule { }
```

# UsersComponent

```ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroment';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


import { User } from '../../models/user.model'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'email', 'login', 'password'];
  public users!: MatTableDataSource<User>;

  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "id";
  public defaultSortOrder: "asc" | "desc" = "asc";

  defaultFilterColumn: string = "login";
  filterQuery?:string;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterTextChanged: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient)
  {
  }

  ngOnInit() {
    this.loadData();
  }

  // debounce filter text changes
  // можно применить технику throttleTime.
  onFilterTextChanged(filterText: string) {
    if (this.filterTextChanged.observers.length === 0) {
      this.filterTextChanged
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe(query => {
          this.loadData(query);
        });
    }
    this.filterTextChanged.next(filterText);
  }


  loadData(query?: string) {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    this.filterQuery = query;
    this.getData(pageEvent);
  }

  getData(event: PageEvent) {
    var url = environment.baseUrl + 'api/Users';
    var params = new HttpParams()
      .set("pageIndex", event.pageIndex.toString())
      .set("pageSize", event.pageSize.toString())
      .set("sortColumn", (this.sort)
        ? this.sort.active
        : this.defaultSortColumn)
      .set("sortOrder", (this.sort)
        ? this.sort.direction
        : this.defaultSortOrder);

    if (this.filterQuery) {
      params = params
        .set("filterColumn", this.defaultFilterColumn)
        .set("filterQuery", this.filterQuery);
    }

    this.http.get<any>(url, { params })
      .subscribe(result => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.users = new MatTableDataSource<User>(result.data);
      }, error => console.error(error));
  }

}

```

# UsersComponent Template

```html
<h1>Пользователи</h1>

<button mat-flat-button color="primary"
        class="btn-add" *ngIf="users" [routerLink]="['/user']">
  Новый пользователь
</button>

<button mat-flat-button color="primary"
        class="btn-add" [routerLink]="['/role']">
  Новая роль
</button>


<p *ngIf="!users"><em>Loading...</em></p>

<mat-form-field [hidden]="!users">
  <input matInput #filter (keyup)="onFilterTextChanged(filter.value)"
         placeholder="Filter by login (or part of it)...">
</mat-form-field>


<table mat-table [dataSource]="users"
       class="mat-elevation-z8"
       [hidden]="!users"
  matSort (matSortChange)="loadData()"
  [matSortActive]="defaultSortColumn"
  [matSortDirection]="defaultSortOrder">

  <!-- Id Column -->
  <ng-container matColumnDef="id">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>Id</th>
    <td mat-cell *matCellDef="let user">{{user.id}}</td>
  </ng-container>
  <!-- Name Column -->
  <ng-container matColumnDef="email">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
    <td mat-cell *matCellDef="let user">{{user.email}}</td>
  </ng-container>
  <!-- Lat Column -->
  <ng-container matColumnDef="login">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>Login</th>
    <td mat-cell *matCellDef="let user">
      <a [routerLink]="['/user', user.id]">{{user.login}}</a>
    </td>


  </ng-container>
  <!-- Lon Column -->
  <ng-container matColumnDef="password">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>Password</th>
    <td mat-cell *matCellDef="let user">{{user.password}}</td>
  </ng-container>
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>

<!-- Pagination directive -->
<mat-paginator [hidden]="!users"
               (page)="getData($event)"
               [pageSize]="10"
               [pageSizeOptions]="[10, 20, 50]"
               showFirstLastButtons>
</mat-paginator>

```

# FormComponent

```ts
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, AsyncValidatorFn} from '@angular/forms';
import { environment } from '../../../enviroments/enviroment'

import { User, Role } from '../../models/user.model'

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})

export class UserEditComponent {

  title?: string;
  form!: FormGroup;
  user?: User;
  id?: number;
  roles?: Role[];


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
  }


  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('',Validators.required),
      login: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      roleId: new FormControl('',Validators.required)
    }, null, this.isUniqEmail());

    this.loadData();
  }

  loadData() {

    this.loadRoles();
    console.log(this.loadRoles());

    // retrieve the ID from the 'id' parameter
    var idParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0;
    if (this.id) {
      // EDIT MODE
      // fetch the User from the server
      var url = environment.baseUrl + 'api/Users/' + this.id;
      this.http.get<User>(url).subscribe(result => {
        this.user = result;
        this.title = "Edit - " + this.user.email;
        // update the form with the User value
        this.form.patchValue(this.user);
      }, error => console.error(error));
    }
    else {
      // ADD NEW MODE
      this.title = "Create a new User";
    }
  }


  loadRoles() {
    // fetch all the roles from the server
    var url = environment.baseUrl + 'api/Roles';

    // var params = new HttpParams()
    // .set("pageIndex", "0")
    // .set("pageSize", "9999")
    // .set("sortColumn", "name");
    
    this.http.get<Role[]>(url).subscribe(response => {
    this.roles = response;
    console.log(response);
    }, error => console.error(error));
    }


  onSubmit() {
    var user = (this.id) ? this.user : <User>{};
    if (user) {
      user.email = this.form.controls['email'].value;
      user.login = this.form.controls['login'].value;
      user.password = this.form.controls['password'].value;
      user.roleId = this.form.controls['roleId'].value;

      if (this.id) {
        // EDIT mode
        var url = environment.baseUrl + 'api/Users/' + user.id;
        this.http
          .put<User>(url, user)
          .subscribe(result => {
            console.log("User " + user!.id + " has been updated.");
            // go back to cities view
            this.router.navigate(['/users']);
          }, error => console.error(error));
      }
      else {
        // ADD NEW mode
        var url = environment.baseUrl + 'api/Users';
        this.http
          .post<User>(url,user)
          .subscribe(result => {
            console.log("User " + result.id + " has been created.");
            // go back to cities view
            this.router.navigate(['/users']);
          }, error => console.error(error));
      }
    }
  }


  isUniqEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } |
   null> => {
    var user = <User>{};
    user.id = (this.id) ? this.id : 0;
    user.login = this.form.controls['login'].value;
    user.email = this.form.controls['email'].value;
    user.password = this.form.controls['password'].value;
    user.roleId = this.form.controls['roleId'].value;
    var url = environment.baseUrl + 'api/Users/isUniqEmail';
    return this.http.post<boolean>(url, user).pipe(map(result => {
    return (result ? { isUniqEmail: true } : null);
    }));
    }
   
    }

}

```

# FormComponent Template

```html
<div class="user-edit">
  <h1>{{title}}</h1>
  <p *ngIf="this.id && !user"><em>Loading...</em></p>
  <div [formGroup]="form" (ngSubmit)="onSubmit()">

    <p>
      <mat-error *ngIf="form.invalid && form.hasError('isUniqEmail')">
      <strong>ERROR</strong>:
      Email already exists.
      </mat-error>
    </p>

    <!-- Email -->
    <mat-form-field>
      <mat-label>Email:</mat-label>
      <input matInput formControlName="email" required
             placeholder="Type a Email">
    
      <mat-error *ngIf="this.form.controls['email'].errors?.['required']">
        email is required.
      </mat-error>
     </mat-form-field>


    <!-- Login -->
    <mat-form-field>
      <mat-label>Login:</mat-label>
      <input matInput formControlName="login" required
             placeholder="Insert Login">
      <mat-error *ngIf="this.form.controls['login'].errors?.['required']">
        login is required.
      </mat-error>
    </mat-form-field>

    <!-- Password -->
    <mat-form-field>
      <mat-label>Password:</mat-label>
      <input matInput formControlName="password" required
             placeholder="Insert Password">
      <mat-error *ngIf="this.form.controls['password'].errors?.['required']">
        password is required.
      </mat-error>
    </mat-form-field>

    <!-- <p *ngIf="roles">
      
      <select id="roleId" formControlName="roleId">
      <option value="">--- Роль ---</option>
      <option *ngFor="let r of roles" [value]="r.id">
      {{r.name}}
      </option>
      </select>
    </p> -->

    <mat-form-field *ngIf="roles">
      <mat-label>Выберите роль...</mat-label>
      <mat-select id="roleId" formControlName="roleId">
        <mat-option *ngFor="let r of roles" [value]="r.id">
          {{r.name}}
        </mat-option>
      </mat-select>
      <mat-error *ngIf="this.form.controls['roleId'].errors?.['required']">
        roleId is required.
      </mat-error>
     </mat-form-field>


  <div>

      <button mat-flat-button
              color="primary"
              type="submit"
              [disabled]="form.invalid"
              (click)="onSubmit()">
        {{ this.id ? "Save" : "Create" }}
      </button>
      <button mat-flat-button
              color="secondary"
              [routerLink]="['/users']">
        Cancel
      </button>
    </div>
  </div>
</div>

```

# FormBuilder

```ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidatorFn} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../enviroments/enviroment';
import { Role } from '../../models/user.model';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrl: './role-edit.component.scss'
})

export class RoleEditComponent implements OnInit {

  title?: string;
  form!: FormGroup;
  role?: Role;
  id?: number;
  roles?: Role[];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['',
        Validators.required,
        this.isRoleUniq()
      ], 
    });

    this.loadData();
  }


  loadData() {
    // retrieve the ID from the 'id' parameter
    var idParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0;
    if (this.id) {
      // EDIT MODE
      // fetch the role from the server
      var url = environment.baseUrl + "api/Roles/" + this.id;
      this.http.get<Role>(url).subscribe(result => {
        this.role = result;
        this.title = "Редактировать - " + this.role.name;
        // update the form with the role value
        this.form.patchValue(this.role);
      }, error => console.error(error));
    }
    else {
      // ADD NEW MODE
      this.title = "Создать новую роль";
    }
  }


  onSubmit() {
    var role = (this.id) ? this.role : <Role>{};
    if (role) {
      role.name = this.form.controls['name'].value;

      if (this.id) {
        // EDIT mode
        var url = environment.baseUrl + 'api/Roles/' + role.id;
        this.http
          .put<Role>(url, role)
          .subscribe(result => {

            console.log("Роль " + role!.id + " обновлена");
            // go back to roles view
            this.router.navigate(['/roles']);
          }, error => console.error(error));
      }
      else {
        // ADD NEW mode
        var url = environment.baseUrl + 'api/Roles';
        this.http
          .post<Role>(url, role)
          .subscribe(result => {
            console.log("Роль " + result.id + " создана");
            // go back to roles view
            this.router.navigate(['/roles']);
          }, error => console.error(error));
      }
    }
  }

  isRoleUniq(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{
      [key: string]: any
    } | null> => {

      var role = <Role>{};
      role.id = (this.id) ? this.id : 0;
      role.name = this.form.controls['name'].value;

      var url = environment.baseUrl + 'api/Roles/IsUniqName';
      return this.http.post<boolean>(url, role)
        .pipe(map(result => {
          return (result ? { isRoleUniq: true } : null);
        }));
    }
  }
}

```

# FormBuilder Template

```html
<div class="role-edit">
  <h1>{{title}}</h1>
  <p *ngIf="this.id && !role"><em>Loading...</em></p>
  <form [formGroup]="form" (ngSubmit)="onSubmit()">
    <!-- Name -->
    <mat-form-field>
      <mat-label>Name:</mat-label>
      <input matInput formControlName="name" required
             placeholder="Type a name">
      <mat-error *ngIf="this.form.controls['name'].errors?.['required']">
        Name is required.
      </mat-error>
      <mat-error *ngIf="this.form.controls['name'].errors?.['isRoleUniq']">
        Name already exists: please choose another.

      </mat-error>
    </mat-form-field>

    <div>
      <button mat-flat-button color="primary" type="submit">
            {{ this.id ? "Сохранить" : "Создать" }}
      </button>

       <button mat-flat-button color="secondary"
       [routerLink]="['/users']">
        Cancel
       </button>
    </div>
 </form>
</div>

```

# Angular Material

```
ng add @angular/material
```

```html
<button mat-icon-button color="primary" (click)="redirectToDetails(element.id)">
    <mat-icon class="mat-18">reorder</mat-icon>
</button>
```

# Сервис

```ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  constructor(private http: HttpClient) { }
  public getData = () => {
    return this.http.get<any>(this.createCompleteRoute(environment.apiUrl));
  }
 
  public create = (route: string, body: any) => {
    return this.http.post(this.createCompleteRoute(environment.apiUrl), body, this.generateHeaders());
  }
 
  public update = (route: string, body: any) => {
    return this.http.put(this.createCompleteRoute(environment.apiUrl), body, this.generateHeaders());
  }
 
  public delete = (route: string) => {
    return this.http.delete(this.createCompleteRoute(environment.apiUrl));
  }
 
  private createCompleteRoute = (envAddress: string) => {
    return `${envAddress}`;
  }
 
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }
}
```

# Сервис 2

```ts
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "../../enviroments/enviroment";

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  url: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  // получение пользователей по параметрам

  getEmployees(options: Options): Observable<any> {

    var params = new HttpParams();
    params = params
                    .set("sortColumn", options.sortColumn)
                    .set("sortOrder", options.sortOrder)
                    .set("pageIndex", options.pageIndex)
                    .set("pageSize", options.pageSize);

    if (options.search != "") {
      params = params.set("fio", options.search);
    }

    if (options.salary != 0) {
      params = params.set("salary", options.salary);

      console.log(params);
    }

    //const url = `${this.url}?pageSize=${options.pageSize}&fio=${options.search}`;
    return this.http.get(this.url, {params}).pipe(map(response => response));
  }
}

export interface Options {
  //departamentId: number;
  //fio: string;
  //date: Date;
  //birthdate: Date;
  //salary: number;
  sortColumn: string;
  sortOrder: string;
  pageIndex: number;
  pageSize: number;
  search: string;
  salary: number;
}

```

# Employee template

```html
<div class="row my-5 ">
    <div class="col">

        <p *ngIf="!employees"><em>Loading...</em></p>

        <div>

            <div [hidden]="!employees">
                <input #filter
                       (keyup)="search($event)"
                       placeholder="Поиск">
            </div>

            <div>
                <label [textContent]="slider2.value" class="form-label">Зарплата</label>
                <input  #slider2 type="range" class="form-range"  value="100" step="100" min="100" max="1000" (input) ="slider($event)">
            </div>

            <div class="input-group mb-3">

                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Size:
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><button class="dropdown-item" type="button" (click)="size(5)">5</button></li>
                    <li><button class="dropdown-item" type="button" (click)="size(10)">10</button></li>
                </ul>
            </div>

            <table class="table table-borderless" [hidden]="!employees">
                <thead>
                <tr>
                    <th scope="col" (click)="order('DepartamentId')" role="button">
                        Отдел
                    </th>

                    <th scope="col" (click)="order('FullName')" role="button">
                        Фио
                    </th>

                    <th scope="col" (click)="order('Salary')" role="button">
                        Заработная плата
                    </th>

                    <th scope="col" (click)="order('DateEmployment')" role="button">
                        Дата устройства
                    </th>

                    <th scope="col" (click)="order('BirthDay')" role="button">
                        Дата рождения
                    </th>

                    <th scope="row"></th>
                    <th scope="row"></th>
                </tr>
                </thead>

                <tbody>

                <tr *ngFor="let employee of employees" align="left">
                    <td>{{ employee.departament?.name }}</td>
                    <td>{{ employee.fullName }}</td>
                    <td>{{ employee.salary | currency:"RUB":"symbol" }}</td>
                    <td>{{ employee.dateEmployment | date:'dd.MM.yyyy' }}</td>
                    <td>{{ employee.birthDay | date:'dd.MM.yyyy' }}</td>

                    <td><button class="btn btn-info">Edit</button></td>
                    <td><button class="btn btn-danger">Удалить</button></td>
                </tr>

                </tbody>
            </table>

            <nav *ngIf="numbers.length > 1">
                <ul class="pagination justify-content-center">
                    <li id="prev" class="page-item" [ngClass]="{ 'disabled': options.pageIndex === 1 }">
                        <a class="page-link" (click)="prev()">Previous</a>
                    </li>
                    <ng-container *ngIf="employees">
                        <li class="page-item" *ngFor="let number of numbers" [ngClass]="{ 'active': options.pageIndex === number }">
                            <a class="page-link" (click)="to(number)">{{number}}</a>
                        </li>
                    </ng-container>
                    <li id="next" class="page-item" [ngClass]="{ 'disabled': options.pageIndex === numbers.length }">
                        <a class="page-link" (click)="next()" disabled="true">Next</a>
                    </li>
                </ul>
            </nav>
        </div>

    </div>
</div>
```

# Employee Component
```ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { NgIf,NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { EmployeeService, Options } from '../../services/employee.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, CurrencyPipe,CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})

export class EmployeesComponent implements OnInit, OnDestroy {

  title: string = "Сотрудники";
  employees?: Employee[] | null;

  options: Options = {
    sortColumn:"FullName",
    sortOrder: "ASC",
    pageIndex: 1,
    pageSize: 5,
    search: "",
    salary: 0
  };

  getEmployeesSub: Subscription;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  ngOnDestroy(): void {
    this.getEmployeesSub.unsubscribe();
  }

  getEmployees(): void {
    this.getEmployeesSub = this.employeeService
                               .getEmployees(this.options)
                               .subscribe(response => this.employees = response.data);
  }

  // поиск по имени
  search($event: any): void {
    const text = $event.target.value;
    this.options.search = text;
    //this.options.page = 1;
    this.getEmployees();
  }

  // поиск по зарплате
  slider($event: any): void {
    const text = $event.target.value;
    this.options.salary = Number(text);
    console.log(this.options.salary)
    this.options.pageIndex = 1;
    this.getEmployees();
  }


  size(size: number) {
    this.options.pageSize = size;
    this.options.pageIndex = 1;
    this.getEmployees();
  }

  get numbers(): number[] {
    const limit = Math.ceil(10 / this.options.pageSize);
    return Array.from({ length: limit }, (_, i) => i + 1);
  }

  next() {
    this.options.pageIndex++;
    this.getEmployees();
  }

  prev() {
    this.options.pageIndex--;
    this.getEmployees();
  }

  to(page: number) {
    this.options.pageIndex = page;
    this.getEmployees();
  }

  order(column: string) {

    this.options.sortColumn = column;

    this.getEmployees();
  }    
}

```



