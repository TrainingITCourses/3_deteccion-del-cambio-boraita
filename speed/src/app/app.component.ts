import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.criteries = [
      { value: 'state', name: 'Estado' },
      { value: 'agencies', name: 'Agencia' },
      { value: 'type', name: 'Tipo' }
    ];
    this.criteryList = this.http
      .get('../assets/data/launchstatus.json')
      .pipe(map(data => data['types']));
  }
  criteryChanged(event) {
    switch (event.target.value) {
      case 'Agencia':
        this.criteryList = this.http
          .get('../assets/data/agencies.json')
          .pipe(map(data => data['agencies']));
        break;
      case 'Estado':
        this.criteryList = this.http
          .get('../assets/data/launchstatus.json')
          .pipe(map(data => data['types']));
        break;
      case 'Tipo':
        this.criteryList = this.http
          .get('../assets/data/missiontypes.json')
          .pipe(map(data => data['types']));
        break;
    }
  }
}
