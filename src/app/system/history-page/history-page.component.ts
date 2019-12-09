import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, Subscription} from 'rxjs';
import {Category, CRMEvent} from '../../shared/interfaces';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import * as moment from 'moment'

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  sub: Subscription
  categories: Category[] = []
  events: CRMEvent[] = []
  filteredEvents: CRMEvent[] = []
  isLoaded = false
  chartData = []
  isFilterVisible = false

  constructor(
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) { }

  calculateChartData(): void {
    this.chartData = []
    this.categories.forEach((cat) => {
      const catEvent = this.filteredEvents.filter((e) => e.category === cat.id && e.type === 'outcome')
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

      this.setOriginalEvents()
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

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir
  }

  openFilter() {
    this.toggleFilterVisibility(true)
  }

  onFilterApply(filterData: any) {
    this.toggleFilterVisibility(false)
    this.setOriginalEvents()

    const startPeriod = moment().startOf(filterData.period).startOf('d')
    const endPeriod = moment().endOf(filterData.period).endOf('d')

    this.filteredEvents = this.filteredEvents
      .filter((e) => {
        return filterData.types.indexOf(e.type) !== -1
      })
      .filter((e) => {
        return filterData.categories.indexOf(e.category.toString()) !== -1
      })
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss')
        return momentDate.isBetween(startPeriod, endPeriod)
      })

    this.calculateChartData()
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false)
    this.setOriginalEvents()
    this.calculateChartData()
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice()
  }

}

