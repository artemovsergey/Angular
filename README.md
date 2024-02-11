# Технический журнал Angular

- angular рекомендует работать через автономные компоненты
- можно работать через модули


# Создание проекта

```cmd
ng new nameapp --skip-tests
ng new nameapp --directory SportsStore/ClientApp --routing true --style css --skip-tests true --skip-git true
```

# Запуск

команда из ```package.json```
```cmd
npm start
```

## Binding

- {{title}}
- [value]="title"
- [{ngModel}="title"]

Замечание:  imports:[FormsModule] для двусторонней привязки


- стили

```
<h1 [style.font-size]="count+'px'"> {{title}}</h1>
```

- класс
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
