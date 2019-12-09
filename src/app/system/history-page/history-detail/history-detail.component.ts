import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {EventsService} from '../../shared/services/events.service';
import {CategoriesService} from '../../shared/services/categories.service';
import {mergeMap} from 'rxjs/operators';
import {Category, CRMEvent} from '../../../shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: CRMEvent
  category: Category
  isLoaded = false
  sub: Subscription

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.sub = this.route.params
      .pipe(
        mergeMap((params: Params) => {
          console.log("params from route", params)
          return this.eventsService.getEventById(params['id'])
        }),
        mergeMap((event: CRMEvent) => {
          console.log('event', event)
          this.event = event
          return this.categoriesService.getCategoryById(event.category.toString())
        })
      )
      .subscribe((category: Category) => {
        console.log('category', category)
        this.category = category
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
