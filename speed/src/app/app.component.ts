import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { FilterService } from './services/filter.service';
import { CriteryService } from './services/critery.service';

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
  constructor(
    private filterService: FilterService,
    private criteryService: CriteryService
  ) {}
  ngOnInit() {
    this.criteries = [
      { value: 'state', name: 'Estado' },
      { value: 'agencies', name: 'Agencia' },
      { value: 'type', name: 'Tipo' }
    ];
    this.criterySelected = this.criteries[0];
    this.criteryChanged();
    this.launchesList = this.filterService.getAllLaunches();
  }
  criteryChanged() {
    switch (this.criterySelected.value) {
      case 'agencies':
        this.criteryList = this.criteryService.getAgencies();
        break;
      case 'state':
        this.criteryList = this.criteryService.getState();
        break;
      case 'type':
        this.criteryList = this.criteryService.getTypes();
        break;
    }
  }
  filterLaunches(filterSelected) {
    switch (this.criterySelected.value) {
      case 'agencies':
        this.launchesList = this.filterService.getFilterAgencies(
          filterSelected.type
        );
        break;
      case 'state':
        this.launchesList = this.filterService.getFilterMissions(
          filterSelected.id
        );
        break;
      case 'type':
        this.launchesList = this.filterService.getFilterLaunchers(
          filterSelected.id
        );
        break;
    }
  }
}
