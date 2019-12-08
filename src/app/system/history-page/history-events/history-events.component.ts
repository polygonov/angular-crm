import {Component, Input, OnInit} from '@angular/core';
import {Category, CRMEvent} from '../../../shared/interfaces';

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = []
  @Input() events: CRMEvent[] = []

  constructor() { }

  ngOnInit() {
    this.events.forEach((e) => {
      e.catName = this.categories.find(c => c.id === e.category).name
    })
  }

  getEventClass(event: CRMEvent) {
    return {
      'label': true,
      'label-danger': event.type === 'outcome',
      'label-success': event.type === 'income',
    }
  }
}
