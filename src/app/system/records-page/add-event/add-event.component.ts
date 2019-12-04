import { Component, OnInit, Input } from '@angular/core';
import {Category, CRMEvent} from '../../../shared/interfaces';
import { NgForm } from '@angular/forms';
import * as moment from 'moment'

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ]

  constructor() { }

  ngOnInit() {
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
  }

}
