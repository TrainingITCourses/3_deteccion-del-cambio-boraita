import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class CriteryService {
  constructor(private http: HttpClient) {}

  getAgencies() {
    return this.http
      .get('../assets/data/agencies.json')
      .pipe(map(data => data['agencies']));
  }
  getState() {
    return this.http
      .get('../assets/data/launchstatus.json')
      .pipe(map(data => data['types']));
  }
  getTypes() {
    return this.http
      .get('../assets/data/missiontypes.json')
      .pipe(map(data => data['types']));
  }
}
