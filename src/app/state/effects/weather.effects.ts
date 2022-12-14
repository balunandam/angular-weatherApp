import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import { ApiService } from '../../services/apiservice';

import * as weatherAction from '../actions/weather.action';

@Injectable()
export class weatherEffects {
  constructor(
    private readonly actions: Actions,
    private readonly weatherService: ApiService
  ) {}

  GetWeatherList = createEffect(() =>
    this.actions.pipe(
      ofType(weatherAction.getWeatherReport),
      exhaustMap((data) =>
        this.weatherService.getWeather(data).pipe(
          map((response: any) => {
            return weatherAction.getWeatherReportSuccess({ response });
          }),
          catchError((error) =>
            of(weatherAction.getWeatherReportFailure(error))
          )
        )
      )
    )
  );
}
