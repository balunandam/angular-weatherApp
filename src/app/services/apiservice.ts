import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  public getWeather(data): Observable<any> {
    const datas = data;
    return this.http
      .get(
        `https://api.openweathermap.org/data/2.5/forecast/daily?units=Metric&exclude=alerts,hourly,minutely&APPID=eb03b1f5e5afb5f4a4edb40c1ef2f534&q=${datas.locations}`
      )
      .pipe(
        map((events) => {
          return events;
        }),
        catchError(this.handleError)
      );
  }
  public handleError(error: Response) {
    return throwError(error);
  }
}
