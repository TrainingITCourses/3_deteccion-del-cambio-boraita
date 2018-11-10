import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';

import { Agency } from './store/models/agency';
import { LaunchLight } from './store/models/launch-light';
import { Mission } from './store/models/mission';
import { Launch } from './store/models/launch';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'speed';
  criteries;
  criteryList;
  criterySelected;
  launchesList;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.criteries = [
      { value: 'state', name: 'Estado' },
      { value: 'agencies', name: 'Agencia' },
      { value: 'type', name: 'Tipo' }
    ];
    this.criterySelected = this.criteries[0];
    this.criteryChanged();
    this.launchesList = this.http
      .get('../assets/data/launches.json')
      .pipe(map(data => data['launches']));
  }
  criteryChanged() {
    switch (this.criterySelected.value) {
      case 'agencies':
        this.criteryList = this.http
          .get('../assets/data/agencies.json')
          .pipe(map(data => data['agencies']));
        break;
      case 'state':
        this.criteryList = this.http
          .get('../assets/data/launchstatus.json')
          .pipe(map(data => data['types']));
        break;
      case 'type':
        this.criteryList = this.http
          .get('../assets/data/missiontypes.json')
          .pipe(map(data => data['types']));
        break;
    }
  }
  filterLaunches(filterSelected) {
    switch (this.criterySelected.value) {
      case 'agencies':
        this.launchesList = this.http.get('../assets/data/launches.json').pipe(
          map(data =>
            data['launches'].filter((launch: Launch) => {
              if (launch.missions.length > 0 && launch.missions[0].agencies ) {
                return launch.missions[0].agencies.find(
                  agency => agency.type === filterSelected.type
                );
              }
            })
          )
        );
        break;
      case 'state':
        this.launchesList = this.http
          .get('../assets/data/launches.json')
          .pipe(
            map(data =>
              data['launches'].filter(
                (launch: Launch) => launch.status === filterSelected.id
              )
            )
          );
        break;
      case 'type':
        this.launchesList = this.http
          .get('../assets/data/launches.json')
          .pipe(
            map(data =>
              data['launches'].filter((launch: Launch) =>
                launch.missions.find(
                  mission => mission.type === filterSelected.id
                )
              )
            )
          );
        break;
    }
  }
}
