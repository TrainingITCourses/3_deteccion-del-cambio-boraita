import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Launch } from '../store/models/launch';

@Injectable()
export class FilterService {
  constructor(private http: HttpClient) {}
  getFilterAgencies(type) {
    return this.http.get('../assets/data/launches.json').pipe(
      map(data =>
        data['launches'].filter((launch: Launch) => {
          if (launch.missions.length > 0 && launch.missions[0].agencies) {
            return launch.missions.find(
              mission =>
                mission.agencies &&
                mission.agencies.find(agency => agency.type === type) !==
                  undefined
            );
          }
        })
      )
    );
  }

  getFilterMissions(missionId) {
    return this.http
      .get('../assets/data/launches.json')
      .pipe(
        map(data =>
          data['launches'].filter(
            (launch: Launch) => launch.status === missionId
          )
        )
      );
  }

  getFilterLaunchers(launchId) {
    return this.http
      .get('../assets/data/launches.json')
      .pipe(
        map(data =>
          data['launches'].filter((launch: Launch) =>
            launch.missions.find(mission => mission.type === launchId)
          )
        )
      );
  }

  getAllLaunches() {
    return this.http
      .get('../assets/data/launches.json')
      .pipe(map(data => data['launches']));
  }
}
