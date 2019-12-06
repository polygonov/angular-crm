import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bill, BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {forkJoin, Subscription} from 'rxjs';
import {Category, CRMEvent} from '../../shared/interfaces';

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false
  sub: Subscription
  bill: Bill
  categories: Category[]
  crmEvents: CRMEvent[]

  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.sub = forkJoin([
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ]).subscribe((data: [Bill, Category[], CRMEvent[]]) => {
      this.bill = data[0]
      this.categories = data[1]
      this.crmEvents = data[2]
      this.isLoaded = true
      this.sub.unsubscribe()

      console.log( this.bill , this.categories , this.crmEvents )
    })
  }

  getCategoryCost(cat: Category): number {
    const catEvents = this.crmEvents.filter(e => e.category === cat.id && e.type === 'outcome')
    return catEvents.reduce((total, e) => {
      total += e.amount
      return total
    }, 0)
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity
    return percent > 100 ? 100 : percent
  }

  getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%'
  }

  getCatColorClass(cat: Category) {
    const percent = this.getPercent(cat)
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning'
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

}
