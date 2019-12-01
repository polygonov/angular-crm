import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bill, BillService} from '../shared/services/bill.service';
import {forkJoin, Subscription} from 'rxjs';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  sub: Subscription

  constructor(
    private billService: BillService
  ) { }

  ngOnInit() {
    //очень важный пример
    //обрабатывем сразу два Observable стрима
    //и в subscribe получаем массив результатов каждого стрима
    this.sub = forkJoin([
      this.billService.getBill(),
      this.billService.getCurrency()
    ]).subscribe((data: [Bill, any]) => {
      console.log('RESULT', data)
    })

  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
