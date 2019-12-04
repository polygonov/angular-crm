import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Category, CRMEvent, Message} from '../../../shared/interfaces';
import { NgForm } from '@angular/forms';
import * as moment from 'moment'
import {EventsService} from '../../shared/services/events.service';
import {Bill, BillService} from '../../shared/services/bill.service';
import {mergeMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  @Input() categories: Category

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ]

  message: Message

  sub: Subscription

  constructor(
    private eventsService: EventsService,
    private billService: BillService
  ) { }

  ngOnInit() {
    this.message = {type: 'danger', text: ''}
  }

  private showMessage(text: string) {
    this.message.text = text
    setTimeout(() => {
      this.message.text = ''
    }, 5000)
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
    let {amount, description, category, type} = form.value
    if (amount < 0) {
      amount *= -1
    }

    const event: CRMEvent = {
      amount: amount,
      category: +category,
      date: moment().format('DD.MM.YYYY HH:mm:ss'),
      description: description,
      type: type
    }

    this.sub = this.billService.getBill()
      .subscribe((bill: Bill) => {
        let value = 0
        if(type === 'outcome') {
          if(amount > bill.value) {
            console.log(`На счете недостаточно средств. Вам не хватает ${amount - bill.value}`)
            this.showMessage(`На счете недостаточно средств. Вам не хватает ${amount - bill.value}`)
            return
          } else {
            value = bill.value - amount
          }
        } else {
          value = bill.value + amount
        }

        this.sub.unsubscribe()

        this.sub = this.billService.updateBill({value, currency: bill.currency})
          .pipe(
            mergeMap(() => this.eventsService.addEvent(event))
          )
          .subscribe(() => {
            form.setValue({
              amount: 0,
              description: ' ',
              category: 1,
              type: 'outcome'
            })

            this.sub.unsubscribe()
          })
      })
  }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }

}
