# Технический журнал Angular

# app.config

```ts
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import {MatNativeDateModule} from "@angular/material/core";
import { provideHttpClient, withInterceptors } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
              provideRouter(routes),
              provideAnimationsAsync(),
              provideHttpClient(
                withInterceptors([]),
              ),
              importProvidersFrom(MatNativeDateModule)
            ]
};
```


# Pipe date

```ts
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'taskdate',
  standalone: true
})
export class TaskdatePipe implements PipeTransform {

  transform(date: Date | string, format: string = 'mediumDate'): string | null {

    if(date == null){
      return 'Без срока'
    }

    // дата, которая поставлена в задаче
    const taskdate = new Date(date)

    if(taskdate.toDateString() === new Date().toDateString()){
      return 'Сегодня'
    }

    var currentDate = new Date()  //31.12.2024

    var tomorrow = currentDate;
    tomorrow.setDate(tomorrow.getDate() + 1);  //1.01.2025

    var subtomorrow = new Date();
    subtomorrow.setDate(subtomorrow.getDate() + 2);  //1.01.2025

    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);  //30.12.2024

    if(tomorrow.toDateString() == taskdate.toDateString()){
      return 'Завтра'
    }

    if(subtomorrow.toDateString() == taskdate.toDateString()){
      return 'Послезавтра'
    }

    if(yesterday.toDateString() == taskdate.toDateString()){
      return 'Вчера'
    } 

    // else{
    //   var tomorrow = new Date("2020.01.01");
    //   tomorrow.setDate(tomorrow.getDate() - 1);
    //   console.log(tomorrow)
    // }

    return new DatePipe('en').transform(date,format);
  }
}

```

# Dockerfile

```dockerfile
FROM node:latest
WORKDIR /app
COPY TicTacToe.Angular/package*.json ./
RUN npm install
COPY ./TicTacToe.Angular .
RUN npm run build --prod
RUN npm install -g @angular/cli
EXPOSE 4200
CMD ["ng", "serve","-c", "production", "--host", "0.0.0.0"]

```




