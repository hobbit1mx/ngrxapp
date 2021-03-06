import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as appStore from '../../store';

import { Program } from '../../models/program.model';
import { Activity } from '../../models/activity.model';
@Component({
  selector: 'app-program-activity',
  template: `
    <div>
      <h2>Here comes the form</h2>
      <app-activity-form
        [program]="program$ | async"
        [activity]="activity$  | async"
        (create)="onCreate($event)"
      ></app-activity-form>
    </div>
  `
})
export class ProgramAcivityComponent implements OnInit {
  program$: Observable<Program>;
  activity$: Observable<Activity>;
  constructor(private store: Store<appStore.ProgramsState>) {}

  ngOnInit() {
    this.program$ = this.store.select(appStore.getSpecificItem);
    this.activity$ = this.store.select(appStore.getSpecificActivity);
  }

  onCreate(event: Activity) {
    this.store.dispatch(new appStore.CreateActivity(event));
  }
}
