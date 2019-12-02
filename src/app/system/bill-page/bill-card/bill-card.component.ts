import {Component, Input, OnInit} from '@angular/core';
import {Bill} from "../../shared/services/bill.service";

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill
  @Input() currency: any

  USD: string
  EUR: string

  constructor() { }

  ngOnInit() {
    this.EUR = (this.bill.value/this.currency.EUR).toFixed(2)
    this.USD = (this.bill.value/this.currency.USD).toFixed(2)
  }

}
