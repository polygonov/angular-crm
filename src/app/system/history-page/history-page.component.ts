import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, Subscription} from 'rxjs';
import {Category, CRMEvent} from '../../shared/interfaces';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  sub: Subscription
  categories: Category[] = []
  events: CRMEvent[] = []
  isLoaded = false
  chartData = []

  constructor(
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) { }

  calculateChartData(): void {
    this.chartData = []
    this.categories.forEach((cat) => {
      const catEvent = this.events.filter((e) => e.category === cat.id && e.type === 'outcome')
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount
          return total
        }, 0)
      })
    })
  }

  ngOnInit() {
    this.sub = forkJoin([
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ]).subscribe((data: [Category[], CRMEvent[]]) => {
      this.categories = data[0]
      this.events = data[1]

      this.calculateChartData()

      this.isLoaded = true
      this.sub.unsubscribe()
    })
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

}
