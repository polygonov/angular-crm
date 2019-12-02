import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

  @Input() currency: any

  date: Date

  currencies: string[] = ['EUR', 'USD']

  constructor() { }

  ngOnInit() {
    this.date = new Date()
  }

}
