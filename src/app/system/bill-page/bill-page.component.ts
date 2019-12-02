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

  currency: any
  bill: Bill
  isLoaded = false

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
      this.bill = data[0]
      this.currency = {RUB: 1, EUR: data[1].Valute.EUR.Value, USD: data[1].Valute.USD.Value}
      this.isLoaded = true
      this.sub.unsubscribe()
    })

  }

  ngOnDestroy() {
  }

  onRefresh() {
    this.isLoaded = false
    this.sub = this.billService.getCurrency()
      .subscribe((data: any) => {
        this.currency = {RUB: 1, EUR: data.Valute.EUR.Value, USD: data.Valute.USD.Value}
        this.isLoaded = true
        this.sub.unsubscribe()
      })
  }
}
