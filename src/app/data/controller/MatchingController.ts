import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchingController {
  private apiUrl: string = 'http://localhost:3000/api/v1/matching';

  constructor(private http: HttpClient) {
  }

  getMatchesNumber(): Observable<number> {
    return this.http.get<{ value: number }>(
      `${this.apiUrl}/number`
    ).pipe(
      map(response =>
        response.value
      ));
  }
}
