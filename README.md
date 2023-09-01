# Технический журнал Angular

# Создание проекта

```cmd
ng new nameapp --skip-tests
```

# Запуск

команда из ```package.json```
```cmd
npm run start
```

```cmd
ng serve
```

# Создание компонента

```
ng g c namecomponent 
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










# Карта 

https://roadmap.sh/frontend


# Таблица

|Задача|Реализация|
|:---|:---|
|Реализация бизнес-логики|Создайте класс, и Angular создаст его объект и внедрит в компонент. Вы можете также использовать оператор new|
|Реализация компонента с пользовательским интерфейсом|Создайте класс с аннотацией @Component|
|Определение шаблона HTML для отрисовки компонентом|Укажите либо код HTML в аннотации @Component с помощью свойства template, либо имя файла HTML в templateURL|
|Манипуляции с HTML|Примените одну из структурных директив (*ngIf, *ngFor) или создайте собственный класс с аннотацией @Directive|
|Отсылка к переменной класса текущего объекта|Задействуйте ключевое слово this: this userName="Mary";|
|Настройка навигации для приложения с одной страницей|Сконфигурируйте основанный на компонентах  маршрутизатор, позволяющий соотносить компоненты  и сегменты URL, и добавьте тег \<router-outlet> к шаблону там, где вы хотите отрисовать элемент|
|Отображение значения свойства компонента пользовательского интерфейса|Разместите переменные внутри двойных фигурных скобок внутри шаблона: {{customerName}}|
|Привязка свойства компонента и пользовательского интерфейса|Используйте привязку свойств и квадратные скобки: <input [value]="greeting" >|
|Обработка событий пользовательского интерфейса|Окружите имя события круглыми скобками и укажите  обработчик: <button (click)="onClickEvent()">Get Products</button>|
|Использование двухсторонней привязки|Задействуйте нотацию [()]:<input [(ngModel)]= "myComponentProperty">|
|Передача данных компоненту|Укажите для компонентов аннотации @Input и привяжите к ним значения|
|Передача данных из компонента|Укажите для компонентов аннотации @Output  и используйте EventEmitter для отправки событий|
|Создание запроса HTTP|Внедрите объект HTTP в компонент и вызовите один из методов HTTP: this.http.get('/products')|
|Обработка ответов HTTP|Примените метод subscribe() для результата, который поступает в формате наблюдаемого потока: this.http.get('/products').subscribe(...);|
|Передача фрагмента HTML компоненту-потомку|Используйте тег <ng-content> в шаблоне потомка|
|Перехватывание изменения компонентов|Задействуйте привязки для жизненного цикла элемента|
|Развертывание|Используйте сторонние упаковщики наподобие Webpack для упаковки файлов приложений и фреймворков в пакеты JavaScript|



---


# Вопросы:

1. Когда наступает момент нужно использовать не SPA концепцию, а роутер?
2. Есть конструктор, есть ngInit. Где лучше стартовать?

# Примечания

- декоратор - паттерн, который позволяет добавлять функционал в класс без его изменения (надстройка)

- могут быть компоненты, которые не видны: настройки и диалоговые окна

- при добавлении файлов в assets желательно перезапустить сервер

- можно подклчать bootstrap-css-only

- лучше взять css framework tailwind и научиться на нем делать простой, но понятный и красивый фронтенд

- перегрузку методов в TS делать нельзя

- надо изучить как работатет реактивное программирование в Angular и библиотеку RxJS

- получается, что в Angular реализован реактивный подкход через наблюдаемые объекты и подписки

- есть структурные директивы ( меняют дом) и обычные. Структурные начинаются с *.

- когда мы что-то передаем в компонент, то скобки [], когда что-то хотим получить ().

- Angular MAterial ( есть встроенные возможности сортировки, пагинации)

- Когда мы работаем с Angular, то надо помнить, что мы должны возвращать объекты Observable (для реактивного программирования, асинхронных операций)

- Слой DAO - это по сути набор интерфейсов ( описание сигнатур, поведения). Т.е сервисы -> dao -> data

- Чтобы быстро обернуть возвращаемые данные в контейнер Observable - of(service.data)

- диалоговые окна в Angular реализуются при помощи Angular Material

- работа с выпадающим списком также в Angular Material

- View - это шаблон компонента, а content - это то, что вставляется в тег нашего компанента (селектор)

- Intro для обучения при первом заходе на приложение

- Производительность, Компиляция JIT, AoT

- Кроме компоннета создают также отдельный свой модуль под свою функциональность приложения


# Развертывание

- php hosting
- github pages

